import { getArticles, getCategories, getArticlesWithGallery, getUpcomingEvents, getGlobalConfig, getFeaturedArticles } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const [articlesRes, categories, galleryRes, upcomingEvents, globalConfig, featuredArticles] = await Promise.all([
			getArticles(1, 6),
			getCategories(),
			getArticlesWithGallery(1, 20),
			getUpcomingEvents(10),
			getGlobalConfig(),
			getFeaturedArticles(5),
		]);

		return {
			articles: articlesRes.data ?? [],
			categories: categories ?? [],
			galleryArticles: galleryRes.data ?? [],
			upcomingEvents: upcomingEvents ?? [],
			globalConfig: globalConfig ?? null,
			featuredArticles: featuredArticles ?? [],
		};
	} catch {
		return {
			articles: [],
			categories: [],
			galleryArticles: [],
			upcomingEvents: [],
			globalConfig: null,
			featuredArticles: [],
		};
	}
};

