<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	let { data } = $props();

	const dateFormatted = $derived(new Date(data.article.publishedAt).toLocaleDateString('es-PE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}));

	const tags = $derived(data.article.tags ? data.article.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []);
	const hasGallery = $derived(data.article.gallery && data.article.gallery.length > 0);
</script>

<svelte:head>
	<title>{data.article.title} - Casona Texao</title>
	<meta name="description" content={data.article.metaDescription || data.article.excerpt || ''} />
</svelte:head>

<article class="bg-cream min-h-screen">
	<!-- Hero -->
	<div
		class="relative h-[50vh] flex items-end"
		style="background-image: url('{getImageUrl(data.article.cover)}'); background-size: cover; background-position: center;"
	>
		<div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent"></div>
		<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
			{#if data.article.category}
				<a href="/categoria/{data.article.category.slug}" class="inline-block bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 hover:bg-primary-light transition-colors">
					{data.article.category.name}
				</a>
			{/if}
			<h1 class="font-skia text-3xl md:text-5xl text-white leading-tight mb-3">{data.article.title}</h1>
			<time class="text-white/60 text-sm">{dateFormatted}</time>
		</div>
	</div>

	<!-- Content -->
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		{#if data.article.content}
			<div class="prose max-w-none bg-white rounded-xl p-8 md:p-12 shadow-sm">
				{@html data.article.content}
			</div>
		{/if}

		<!-- Tags -->
		{#if tags.length > 0}
			<div class="flex flex-wrap gap-2 mt-8">
				{#each tags as tag}
					<span class="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">{tag}</span>
				{/each}
			</div>
		{/if}

		<!-- Gallery link -->
		{#if hasGallery}
			<div class="mt-8 p-6 bg-white rounded-xl shadow-sm text-center">
				<h3 class="font-skia text-xl text-primary mb-3">Galería de Fotos</h3>
				<p class="text-dark/60 mb-4">{data.article.gallery?.length} imágenes de este evento</p>
				<a href="/blog/{data.article.slug}/galeria" class="inline-block bg-primary hover:bg-primary-light text-white font-semibold px-6 py-2 rounded-full transition-colors">
					Ver Galería
				</a>
			</div>
		{/if}

		<!-- WhatsApp CTA -->
		<div class="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
			<p class="text-dark/70 mb-3">Interesado en nuestros eventos?</p>
			<a
				href="https://wa.me/51999999999?text=Hola,%20me%20interesa%20el%20evento:%20{encodeURIComponent(data.article.title)}"
				target="_blank"
				rel="noopener"
				class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
				Reservar por WhatsApp
			</a>
		</div>

		<!-- Related -->
		{#if data.related.length > 0}
			<div class="mt-12">
				<h3 class="font-skia text-2xl text-primary mb-6">Artículos Relacionados</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each data.related as article}
						<ArticleCard {article} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</article>
