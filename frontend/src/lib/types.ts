export interface StrapiImage {
	id: number;
	url: string;
	alternativeText: string | null;
	width: number;
	height: number;
	formats?: {
		thumbnail?: StrapiImageFormat;
		small?: StrapiImageFormat;
		medium?: StrapiImageFormat;
		large?: StrapiImageFormat;
	};
}

export interface StrapiImageFormat {
	url: string;
	width: number;
	height: number;
}

export interface Category {
	id: number;
	documentId: string;
	name: string;
	slug: string;
	description: string | null;
}

export interface Article {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	content: string | null;
	excerpt: string | null;
	metaDescription: string | null;
	tags: string | null;
	cover: StrapiImage | null;
	gallery: StrapiImage[] | null;
	category: Category | null;
	publishedAt: string;
	createdAt: string;
}

export interface SiteConfig {
	whatsappNumber: string;
	whatsappMessage: string;
	address: string;
	googleMapsPlaceId: string;
	socialFacebook: string;
	socialInstagram: string;
	socialYoutube: string | null;
	tagline: string;
}

export interface GlobalConfig {
	siteName: string;
	siteDescription: string;
	favicon: StrapiImage | null;
}

export interface StrapiPagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface StrapiResponse<T> {
	data: T;
	meta: {
		pagination?: StrapiPagination;
	};
}
