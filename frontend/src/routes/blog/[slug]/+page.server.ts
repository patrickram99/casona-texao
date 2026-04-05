import { getArticleBySlug, getArticles } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const article = await getArticleBySlug(params.slug);

		if (!article) {
			throw error(404, 'Artículo no encontrado');
		}

		let related: typeof article[] = [];
		if (article.category) {
			try {
				const res = await getArticles(1, 3, article.category.slug);
				related = res.data.filter((a) => a.slug !== article.slug).slice(0, 2);
			} catch {
				// Related articles are optional
			}
		}

		return { article, related };
	} catch (e) {
		if (e && typeof e === 'object' && 'status' in e) throw e;
		throw error(503, 'No se pudo conectar al servidor de contenidos');
	}
};
