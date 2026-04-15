import type { Article, StrapiResponse } from '$lib/types';
import type { PageServerLoad } from './$types';

const STRAPI_URL = process.env.VITE_STRAPI_URL || 'http://localhost:1337';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q')?.trim() || '';

	if (!query) {
		return { query, articles: [] };
	}

	try {
		const params = new URLSearchParams({
			'populate[0]': 'cover',
			'populate[1]': 'category',
			'sort[0]': 'publishedAt:desc',
			'pagination[pageSize]': '20',
			'filters[$or][0][title][$containsi]': query,
			'filters[$or][1][excerpt][$containsi]': query,
			'filters[$or][2][tags][$containsi]': query,
			'filters[$or][3][content][$containsi]': query,
		});

		const res = await fetch(`${STRAPI_URL}/api/articles?${params}`);
		if (!res.ok) throw new Error('API error');

		const data: StrapiResponse<Article[]> = await res.json();
		return { query, articles: data.data ?? [] };
	} catch {
		return { query, articles: [] };
	}
};
