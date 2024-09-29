import { error } from '@sveltejs/kit';
import { logger } from '$lib/server/logger';
import { initializePrisma } from '$lib/server/db';
import { GetDetail as UserGetDetail } from '$lib/user/get-detail';
import { superValidate, message } from 'sveltekit-superforms';
import { vine } from 'sveltekit-superforms/adapters';
import {schema, defaults} from './schema';


import type { PageServerLoad, PageServerLoadEvent, Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, vine(schema, { defaults }));

		logger.info(form, 'default form');

		if (!form.valid) {
			logger.debug('form invalid');
			return { form };
		}

		const db = event.platform!.env.DB;
		const prisma = initializePrisma(db);
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

	if (event.locals.user) {
		const db = event.platform!.env.DB;
		const prisma = initializePrisma(db);
		const user = await UserGetDetail(prisma, event.locals.user.id);
		if (!user) error(404, 'Not found');
		form = await superValidate(user, vine(schema, { defaults }));
		logger.debug(form, 'form');
	}

	return { form };
};
