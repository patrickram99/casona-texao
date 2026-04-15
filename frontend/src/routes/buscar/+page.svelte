<script lang="ts">
	import { goto } from '$app/navigation';
	import { getImageUrl } from '$lib/api';

	let { data } = $props();
	let searchQuery = $state(data.query);

	function handleSearch(e: Event) {
		e.preventDefault();
		if (searchQuery.trim()) {
			goto(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	}

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('es-PE', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	}
</script>

<svelte:head>
	<title>{data.query ? `"${data.query}" - Búsqueda` : 'Buscar'} - Casona Texao</title>
</svelte:head>

<div class="bg-cream min-h-screen">
	<!-- Search header -->
	<div class="bg-white border-b border-dark/10 py-10">
		<div class="max-w-3xl mx-auto px-6">
			<h1 class="font-skia text-3xl text-primary mb-6">Buscar</h1>
			<form onsubmit={handleSearch} class="flex gap-3">
				<div class="flex-1 relative">
					<svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
					<input
						bind:value={searchQuery}
						type="text"
						placeholder="Buscar artículos, eventos, categorías..."
						class="w-full pl-12 pr-4 py-3 bg-cream rounded-full text-sm text-dark placeholder-dark/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
						autofocus
					/>
				</div>
				<button
					type="submit"
					class="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
				>
					Buscar
				</button>
			</form>
		</div>
	</div>

	<!-- Results -->
	<div class="max-w-3xl mx-auto px-6 py-10">
		{#if data.query}
			<p class="text-sm text-dark/50 mb-8">
				{data.articles.length} resultado{data.articles.length !== 1 ? 's' : ''} para "<span class="text-dark font-medium">{data.query}</span>"
			</p>
		{/if}

		{#if data.articles.length > 0}
			<div class="space-y-6">
				{#each data.articles as article}
					<a href="/blog/{article.slug}" class="group flex gap-5 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
						<div class="w-32 h-24 shrink-0 rounded-lg overflow-hidden">
							<img
								src={getImageUrl(article.cover)}
								alt={article.title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								loading="lazy"
							/>
						</div>
						<div class="flex-1 min-w-0">
							{#if article.category}
								<span class="text-xs font-bold uppercase tracking-wider text-accent">{article.category.name}</span>
							{/if}
							<h2 class="font-skia text-lg text-dark leading-snug group-hover:text-primary transition-colors line-clamp-1 mt-0.5">
								{article.title}
							</h2>
							{#if article.excerpt}
								<p class="text-sm text-dark/50 line-clamp-2 mt-1">{article.excerpt}</p>
							{/if}
							<time class="text-xs text-dark/30 mt-2 block">{formatDate(article.publishedAt)}</time>
						</div>
					</a>
				{/each}
			</div>
		{:else if data.query}
			<div class="text-center py-20">
				<svg class="w-16 h-16 text-dark/15 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				<p class="text-dark/40 text-lg mb-2">No se encontraron resultados</p>
				<p class="text-dark/30 text-sm">Intenta con otros términos de búsqueda</p>
			</div>
		{:else}
			<div class="text-center py-20 text-dark/30">
				<svg class="w-16 h-16 text-dark/10 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				<p class="text-sm">Escribe algo para buscar</p>
			</div>
		{/if}
	</div>
</div>
