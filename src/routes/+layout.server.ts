import { APP_URL } from '$env/static/private'; // TODO https://github.com/sveltejs/kit/issues/8882
import { GetDetail as UserGetDetail } from '$lib/user/get-detail';
import { initializePrisma } from '$lib/server/db';

import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {

	let user = null;

	if (event.locals.user) {
		const db = event.platform!.env.DB;
		const prisma = initializePrisma(db);
		user = await UserGetDetail(prisma, event.locals.user.id);
	}

	let path = event.route.id;

	return {
		appUrl: APP_URL,
		path: path,
		userIsLogged: event.locals.user ? true : false,
		user: user,
	};
};
