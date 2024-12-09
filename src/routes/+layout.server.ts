import { env } from '$env/dynamic/private'; // TODO https://github.com/sveltejs/kit/issues/8882
import { GetDetail as UserGetDetail } from '$lib/user/get-detail';
import { GetUserNotifications } from '$lib/notification/get-user-notifications';
import { getPublicKeyFromJwk } from 'cf-webpush';
import { logger } from '$lib/server/logger';
import prisma from '$lib/server/db';

import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';
import type { UserNotifications } from '$lib/notification/get-user-notifications';

export const load: LayoutServerLoad = async (event: LayoutServerLoadEvent) => {
	const { JWK, APP_URL } = env;

	const { cookies } = event;

	let userData = null;
	let userNotification: UserNotifications = {
		notifications: [],
		notificationsCount: 0
	};

	if (event.locals.user) {
		userData = await UserGetDetail(prisma, event.locals.user.id);
		logger.debug(userData, 'current user');
		userNotification = await GetUserNotifications(prisma, event.locals.user.id);
	}

	const path = event.route.id;

	return {
		appUrl: APP_URL,
		path: path,
		userIsLogged: event.locals.user ? true : false,
		userData,
		JWKpublicKey: getPublicKeyFromJwk(JSON.parse(JWK)),
		notifications: userNotification.notifications,
		notificationsCount: userNotification.notificationsCount,
		cookies: cookies.getAll()
	};
};
