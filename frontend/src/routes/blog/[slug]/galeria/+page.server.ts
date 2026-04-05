import { getArticleBySlug } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const article = await getArticleBySlug(params.slug);

		if (!article) {
			throw error(404, 'Artículo no encontrado');
		}

		return { article };
	} catch (e) {
		if (e && typeof e === 'object' && 'status' in e) throw e;
		throw error(503, 'No se pudo conectar al servidor de contenidos');
	}
};
