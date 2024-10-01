import { ProtectedRoutes } from '$lib/routes';
import { JWK, APP_URL } from '$env/static/private'; // TODO https://github.com/sveltejs/kit/issues/8882
import { GetDetail as UserGetDetail } from '$lib/user/get-detail';
import { GetUserNotifications } from '$lib/notification/get-user-notifications';
import { initializePrisma } from '$lib/server/db';
import { getPublicKeyFromJwk } from 'cf-webpush';
import { locales, loadTranslations, translations, defaultLocale } from '$lib/translations';
import { logger } from '$lib/server/logger';

import type { PageServerLoad, PageServerLoadEvent } from './$types';
import type { UserNotifications } from '$lib/notification/get-user-notifications';

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	let user = null;
	let userNotification: UserNotifications = {
		notifications: [],
		notificationsCount: 0
	};

	if (event.locals.user) {
		const db = event.platform!.env.DB;
		const prisma = initializePrisma(db);
		user = await UserGetDetail(prisma, event.locals.user.id);
		userNotification = await GetUserNotifications(prisma, event.locals.user.id);
	}

	const path = event.route.id;

	const { pathname } = event.url;

	// Try to get the locale from cookie
	let locale = (event.cookies.get('lang') || '').toLowerCase();

	// Get user preferred locale
	if (!locale) {
		locale =
			`${`${event.request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
	}

	// Get defined locales
	const supportedLocales = locales.get().map((l) => l.toLowerCase());

	// Use default locale if current locale is not supported
	if (!supportedLocales.includes(locale)) {
		locale = defaultLocale;
	}

	await loadTranslations(locale, pathname); // keep this just before the `return`

	return {
		isProtectedRoute: ProtectedRoutes.some((route) => route.path === path),
		protectedRouteMessage: ProtectedRoutes.find((route) => route.path === path)?.message,
		appUrl: APP_URL,
		path: path,
		userIsLogged: event.locals.user ? true : false,
		user: user,
		JWKpublicKey: getPublicKeyFromJwk(JSON.parse(JWK)),
		notifications: userNotification.notifications,
		notificationsCount: userNotification.notificationsCount
	};
};
