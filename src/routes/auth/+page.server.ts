import { redirect } from '@sveltejs/kit';
import { logger } from '$lib/server/logger';
import prisma from '$lib/server/db';

import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error, data } = await supabase.auth.signUp({ email, password });
		if (error) {
			logger.error(error);
			redirect(303, '/auth/error');
		} else {
			if (data.user === null) {
				redirect(303, '/auth/error');
			}

			try {
				await prisma.user.create({
					data: {
						id: data.user.id,
						email: email
					}
				});
			} catch (error) {
				logger.error(error);
			}
			redirect(303, '/');
		}
	},
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { data, error } = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: true,
				emailRedirectTo: 'http://localhost:5173/auth/confirm'
			}
		});

		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/');
		}
	}
};
