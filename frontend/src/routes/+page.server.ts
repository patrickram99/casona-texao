import { getArticles, getCategories } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const [articlesRes, categories] = await Promise.all([
			getArticles(1, 6),
			getCategories(),
		]);

		return {
			articles: articlesRes.data ?? [],
			categories: categories ?? [],
		};
	} catch {
		return {
			articles: [],
			categories: [],
		};
	}
};
