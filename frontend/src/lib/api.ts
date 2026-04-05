import type { Article, Category, SiteConfig, GlobalConfig, StrapiResponse } from './types';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

async function fetchApi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
	const url = new URL(`/api${endpoint}`, STRAPI_URL);
	if (params) {
		Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
	}
	const res = await fetch(url.toString());
	if (!res.ok) {
		throw new Error(`API error: ${res.status} ${res.statusText}`);
	}
	return res.json();
}

export function getImageUrl(image: { url: string } | null | undefined): string {
	if (!image?.url) return '/images/placeholder.svg';
	if (image.url.startsWith('http')) return image.url;
	return `${STRAPI_URL}${image.url}`;
}

export function getWhatsAppUrl(phone: string, message?: string): string {
	const encoded = message ? encodeURIComponent(message) : '';
	return `https://wa.me/${phone}${encoded ? `?text=${encoded}` : ''}`;
}

export async function getArticles(page = 1, pageSize = 12, categorySlug?: string): Promise<StrapiResponse<Article[]>> {
	const params: Record<string, string> = {
		'populate[0]': 'cover',
		'populate[1]': 'category',
		'sort[0]': 'publishedAt:desc',
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
	};
	if (categorySlug) {
		params['filters[category][slug][$eq]'] = categorySlug;
	}
	return fetchApi<StrapiResponse<Article[]>>('/articles', params);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
	const res = await fetchApi<StrapiResponse<Article[]>>('/articles', {
		'filters[slug][$eq]': slug,
		'populate[0]': 'cover',
		'populate[1]': 'category',
		'populate[2]': 'gallery',
	});
	return res.data?.[0] ?? null;
}

export async function getCategories(): Promise<Category[]> {
	const res = await fetchApi<StrapiResponse<Category[]>>('/categories', {
		'sort[0]': 'name:asc',
	});
	return res.data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
	const res = await fetchApi<StrapiResponse<Category[]>>('/categories', {
		'filters[slug][$eq]': slug,
	});
	return res.data?.[0] ?? null;
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
	try {
		const res = await fetchApi<StrapiResponse<SiteConfig>>('/site-config');
		return res.data;
	} catch {
		return null;
	}
}

export async function getGlobalConfig(): Promise<GlobalConfig | null> {
	try {
		const res = await fetchApi<StrapiResponse<GlobalConfig>>('/global');
		return res.data;
	} catch {
		return null;
	}
}

export { STRAPI_URL };
