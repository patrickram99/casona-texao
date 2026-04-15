import type { Article, Category, SiteConfig, GlobalConfig, StrapiResponse } from './types';

// Use process.env for runtime (adapter-node), fallback to import.meta.env for dev
const STRAPI_URL = typeof process !== 'undefined' && process.env?.VITE_STRAPI_URL
	? process.env.VITE_STRAPI_URL
	: (import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337');

// For image URLs sent to the browser — use empty string in production (Caddy proxies /uploads/*)
const STRAPI_PUBLIC_URL = typeof process !== 'undefined' && process.env?.VITE_STRAPI_PUBLIC_URL
	? process.env.VITE_STRAPI_PUBLIC_URL
	: (import.meta.env.VITE_STRAPI_PUBLIC_URL || STRAPI_URL);

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
	return `${STRAPI_PUBLIC_URL}${image.url}`;
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

export async function getUpcomingEvents(limit = 10): Promise<Article[]> {
	const today = new Date().toISOString().split('T')[0];
	const res = await fetchApi<StrapiResponse<Article[]>>('/articles', {
		'populate[0]': 'cover',
		'populate[1]': 'category',
		'filters[eventDate][$gte]': today,
		'sort[0]': 'eventDate:asc',
		'pagination[pageSize]': String(limit),
	});
	return res.data ?? [];
}

export async function getArticlesWithGallery(page = 1, pageSize = 12): Promise<StrapiResponse<Article[]>> {
	return fetchApi<StrapiResponse<Article[]>>('/articles', {
		'populate[0]': 'cover',
		'populate[1]': 'category',
		'populate[2]': 'gallery',
		'sort[0]': 'publishedAt:desc',
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
	});
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

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
	const res = await fetchApi<StrapiResponse<Article[]>>('/articles', {
		'filters[featured][$eq]': 'true',
		'populate[0]': 'cover',
		'populate[1]': 'category',
		'populate[2]': 'featuredImage',
		'sort[0]': 'eventDate:desc',
		'sort[1]': 'publishedAt:desc',
		'pagination[pageSize]': String(limit),
	});
	return res.data ?? [];
}

export async function getGlobalConfig(): Promise<GlobalConfig | null> {
	try {
		const res = await fetchApi<StrapiResponse<GlobalConfig>>('/global', {
			'populate[0]': 'heroImage',
			'populate[1]': 'certificateImage',
			'populate[2]': 'nosotrosHeroImage',
			'populate[3]': 'contactoHeroImage',
		});
		return res.data;
	} catch {
		return null;
	}
}

export { STRAPI_URL };
