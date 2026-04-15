<script lang="ts">
	import { getImageUrl } from '$lib/api';

	let { data } = $props();

	const dateFormatted = $derived(new Date(data.article.publishedAt).toLocaleDateString('es-PE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}));

	const tags = $derived(data.article.tags ? data.article.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []);
	const galleryImages = $derived(data.article.gallery || []);
	const galleryPreview = $derived(galleryImages.slice(0, 4));

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
	}
</script>

<svelte:head>
	<title>{data.article.title} - Casona Texao</title>
	<meta name="description" content={data.article.metaDescription || data.article.excerpt || ''} />
</svelte:head>

<article class="bg-cream min-h-screen">
	<!-- Cover Hero -->
	<div
		class="relative h-[45vh] md:h-[55vh]"
		style="background-image: url('{getImageUrl(data.article.cover)}'); background-size: cover; background-position: center;"
	>
		<div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-dark/10"></div>
	</div>

	<!-- Content Area -->
	<div class="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
		<!-- Breadcrumb -->
		<nav class="text-sm text-white/60 mb-4">
			<a href="/" class="hover:text-white transition-colors">Inicio</a>
			<span class="mx-2">/</span>
			<a href="/blog" class="hover:text-white transition-colors">Blog</a>
			{#if data.article.category}
				<span class="mx-2">/</span>
				<a href="/categoria/{data.article.category.slug}" class="hover:text-white transition-colors">{data.article.category.name}</a>
			{/if}
		</nav>

		<!-- Title Card -->
		<div class="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
			<div class="flex flex-col md:flex-row md:gap-12">
				<!-- Main Content -->
				<div class="flex-1 min-w-0">
					{#if data.article.category}
						<span class="inline-block text-xs font-bold uppercase tracking-wider text-accent mb-4">
							{data.article.category.name}
						</span>
					{/if}
					<h1 class="font-skia text-3xl md:text-4xl text-dark leading-tight mb-6">
						{data.article.title}
					</h1>

					{#if data.article.excerpt}
						<p class="text-dark/60 text-lg leading-relaxed mb-8 border-l-4 border-accent pl-5 italic">
							{data.article.excerpt}
						</p>
					{/if}

					{#if data.article.content}
						<div class="prose max-w-none">
							{@html data.article.content}
						</div>
					{/if}
				</div>

				<!-- Side Metadata (desktop) -->
				<aside class="hidden md:block w-48 shrink-0 pt-2">
					<div class="sticky top-24 space-y-6">
						{#if data.article.eventDate}
							<div>
								<p class="text-xs uppercase tracking-wider text-dark/40 mb-1">Fecha del Evento</p>
								<p class="text-sm text-dark/80 font-medium">
									{new Date(data.article.eventDate + 'T00:00:00').toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
								</p>
								{#if data.article.eventTime}
									<p class="text-sm text-primary font-medium mt-0.5">{data.article.eventTime.slice(0, 5)} hrs</p>
								{/if}
							</div>
						{/if}
						<div>
							<p class="text-xs uppercase tracking-wider text-dark/40 mb-1">Fecha de Publicación</p>
							<p class="text-sm text-dark/80 font-medium">{dateFormatted}</p>
						</div>
						{#if data.article.category}
							<div>
								<p class="text-xs uppercase tracking-wider text-dark/40 mb-1">Categoría</p>
								<a href="/categoria/{data.article.category.slug}" class="text-sm text-primary font-medium hover:text-primary-light transition-colors">
									{data.article.category.name}
								</a>
							</div>
						{/if}
						{#if tags.length > 0}
							<div>
								<p class="text-xs uppercase tracking-wider text-dark/40 mb-2">Etiquetas</p>
								<div class="flex flex-wrap gap-1.5">
									{#each tags as tag}
										<span class="text-xs bg-cream text-dark/60 px-2 py-0.5 rounded">{tag}</span>
									{/each}
								</div>
							</div>
						{/if}
						<div class="pt-2">
							<a
								href="https://wa.me/51920779580?text={encodeURIComponent(`Hola, me interesa: ${data.article.title}`)}"
								target="_blank"
								rel="noopener"
								class="flex items-center gap-2 text-sm text-green-700 font-medium hover:text-green-800 transition-colors"
							>
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
								Reservar
							</a>
						</div>
					</div>
				</aside>
			</div>

			<!-- Mobile metadata -->
			<div class="md:hidden flex items-center gap-4 mt-6 pt-6 border-t border-dark/10 text-sm text-dark/50">
				<time>{dateFormatted}</time>
				{#if tags.length > 0}
					<span class="text-dark/20">|</span>
					<span>{tags.slice(0, 3).join(', ')}</span>
				{/if}
			</div>
		</div>

		<!-- Inline Gallery Preview -->
		{#if galleryPreview.length > 0}
			<div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
				<div class="flex items-center justify-between mb-5">
					<h3 class="font-skia text-xl text-dark">Galería del Evento</h3>
					{#if galleryImages.length > 4}
						<a href="/blog/{data.article.slug}/galeria" class="text-sm text-primary font-medium hover:text-primary-light transition-colors">
							Ver las {galleryImages.length} fotos &rarr;
						</a>
					{/if}
				</div>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
					{#each galleryPreview as img, i}
						<a
							href="/blog/{data.article.slug}/galeria"
							class="group relative aspect-square rounded-lg overflow-hidden"
						>
							<img
								src={getImageUrl(img)}
								alt={img.alternativeText || `Foto ${i + 1}`}
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
								loading="lazy"
							/>
							{#if i === 3 && galleryImages.length > 4}
								<div class="absolute inset-0 bg-dark/50 flex items-center justify-center">
									<span class="text-white text-lg font-bold">+{galleryImages.length - 4}</span>
								</div>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Related Articles -->
		{#if data.related.length > 0}
			<div class="mb-12">
				<h3 class="font-skia text-xl text-dark mb-5">También te puede interesar</h3>
				<div class="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
					{#each data.related as article}
						<a href="/blog/{article.slug}" class="group shrink-0 w-72">
							<div class="aspect-[16/10] rounded-xl overflow-hidden mb-3">
								<img
									src={getImageUrl(article.cover)}
									alt={article.title}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
								/>
							</div>
							{#if article.category}
								<span class="text-xs font-bold uppercase tracking-wider text-accent">{article.category.name}</span>
							{/if}
							<h4 class="font-skia text-base text-dark leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
								{article.title}
							</h4>
							<time class="text-xs text-dark/40 mt-1 block">{formatDate(article.publishedAt)}</time>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Mobile WhatsApp sticky bar -->
	<div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-dark/10 p-3 z-40">
		<a
			href="https://wa.me/51920779580?text={encodeURIComponent(`Hola, me interesa: ${data.article.title}`)}"
			target="_blank"
			rel="noopener"
			class="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-colors w-full"
		>
			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
			Reservar por WhatsApp
		</a>
	</div>
</article>
