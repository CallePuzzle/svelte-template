import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './lang.json';

import type { Config } from 'sveltekit-i18n';

export const defaultLocale = 'es';

export const config: Config = {
	loaders: [
		{
			locale: 'es',
			key: 'user',
			loader: async () => (await import('./es/user.json')).default
		}
	]
};

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
