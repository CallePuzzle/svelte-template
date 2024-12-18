import i18n from 'sveltekit-i18n';

//import type { Config } from 'sveltekit-i18n';

export const defaultLocale = 'es';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
	loaders: [
		{
			locale: 'es',
			key: 'index',
			loader: async () => (await import('./es/index.json')).default
		},
		{
			locale: 'es',
			key: 'user',
			loader: async () => (await import('./es/user.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
