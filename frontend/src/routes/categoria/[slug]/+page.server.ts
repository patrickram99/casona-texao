import { getCategoryBySlug, getArticles } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	try {
		const category = await getCategoryBySlug(params.slug);

		if (!category) {
			throw error(404, 'Categoría no encontrada');
		}

		const page = Number(url.searchParams.get('page') || '1');
		const articlesRes = await getArticles(page, 12, params.slug);

		return {
			category,
			articles: articlesRes.data ?? [],
			pagination: articlesRes.meta.pagination ?? null,
		};
	} catch (e) {
		if (e && typeof e === 'object' && 'status' in e) throw e;
		throw error(503, 'No se pudo conectar al servidor de contenidos');
	}
};
