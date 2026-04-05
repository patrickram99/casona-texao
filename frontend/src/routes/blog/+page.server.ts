import { getArticles, getCategories } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = Number(url.searchParams.get('page') || '1');
	const category = url.searchParams.get('categoria') || undefined;

	try {
		const [articlesRes, categories] = await Promise.all([
			getArticles(page, 12, category),
			getCategories(),
		]);

		return {
			articles: articlesRes.data ?? [],
			pagination: articlesRes.meta.pagination ?? null,
			categories: categories ?? [],
			currentCategory: category || null,
		};
	} catch {
		return {
			articles: [],
			pagination: null,
			categories: [],
			currentCategory: category || null,
		};
	}
};
