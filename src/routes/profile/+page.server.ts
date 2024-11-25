import { error } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { logger } from '$lib/server/logger';
import { superValidate, message, type SuperValidated, type Infer } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { UserSchema } from '$lib/schemas';
import prisma from '$lib/server/db';

import type { PageServerLoad, PageServerLoadEvent, Actions } from './$types';
import type { User } from '@prisma/client';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(UserSchema));

		logger.info(form, 'default form');

		if (!form.valid) {
			logger.debug('form invalid');
			return fail(400, { form });
		}

		try {
			const user = await prisma.user.update({
				where: {
					id: event.locals.user!.id
				},
				data: form.data
			});
			logger.info(user, 'profile updated');
			return message(form, 'Form posted successfully!');
		} catch (error) {
			logger.error(error);
			return message(form, 'Error updating profile');
		}
	}
};

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	let form = {};

	const user = (await prisma.user.findUnique({
		where: {
			id: event.locals.user!.id
		}
	})) as User;

	const userData = {
		name: user.name ?? '',
		email: user.email,
		picture: user.picture ?? ''
	};

	form = (await superValidate(userData, zod(UserSchema))) as SuperValidated<
		Infer<typeof UserSchema>
	>;

	return { form, session: event.locals.session };
};
