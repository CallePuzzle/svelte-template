import { locales, loadTranslations, defaultLocale } from '$lib/translations';

import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async ({ data }) => {
	await loadTranslations('es');

	return { ...data };
};
