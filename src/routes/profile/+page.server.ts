import { error } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { logger } from '$lib/server/logger';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { UserSchema } from '$lib/schemas';

import type { PageServerLoad, PageServerLoadEvent, Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(UserSchema));

		logger.info(form, 'default form');

		if (!form.valid) {
			logger.debug('form invalid');
			return fail(400, { form });
		}
	}
};

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	let form = {};

	const user = event.locals.user;
	const userData = {
		name: user?.user_metadata.full_name,
		email: user?.email,
		picture: user?.user_metadata.avatar_url
	};

	form = await superValidate(user, zod(UserSchema));

	return { form, session: event.locals.session };
};
