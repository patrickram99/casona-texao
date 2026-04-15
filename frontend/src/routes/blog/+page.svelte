<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { Article } from '$lib/types';

	let { data } = $props();

	const featured = $derived(data.articles[0] as Article | undefined);
	const rest = $derived(data.articles.slice(1));

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('es-PE', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	}
</script>

<svelte:head>
	<title>Blog - Casona Texao</title>
	<meta name="description" content="Artículos sobre cultura, teatro, charlas y eventos en Casona Texao, Arequipa." />
</svelte:head>

<div class="bg-cream min-h-screen">
	<!-- Featured Article Hero -->
	{#if featured && !data.currentCategory}
		<a href="/blog/{featured.slug}" class="group block relative overflow-hidden" style="min-height: 420px;">
			<img
				src={getImageUrl(featured.cover)}
				alt={featured.title}
				class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
			<div class="relative z-10 max-w-5xl mx-auto px-6 flex flex-col justify-end h-full pb-12 pt-32">
				{#if featured.category}
					<span class="inline-block bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-3 w-fit">
						{featured.category.name}
					</span>
				{/if}
				<h1 class="font-skia text-3xl md:text-5xl text-white leading-tight mb-3 max-w-3xl group-hover:text-accent transition-colors">
					{featured.title}
				</h1>
				{#if featured.excerpt}
					<p class="text-white/70 text-base max-w-2xl mb-3 line-clamp-2">{featured.excerpt}</p>
				{/if}
				<span class="text-white/50 text-sm">{formatDate(featured.publishedAt)}</span>
			</div>
		</a>
	{:else}
		<div class="bg-primary py-14">
			<div class="max-w-5xl mx-auto px-6 text-center">
				<h1 class="font-skia text-4xl text-white mb-2">
					{data.categories.find((c: any) => c.slug === data.currentCategory)?.name || 'Blog'}
				</h1>
				<p class="text-white/60 text-sm">Artículos sobre cultura, teatro, charlas y eventos</p>
			</div>
		</div>
	{/if}

	<div class="max-w-6xl mx-auto px-6 py-10">
		<!-- Category filter -->
		{#if data.categories.length > 0}
			<nav class="flex gap-2 overflow-x-auto pb-2 mb-10 -mx-1 px-1">
				<a
					href="/blog"
					class="shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-colors {!data.currentCategory ? 'bg-primary text-white border-primary' : 'bg-white text-dark/60 border-dark/10 hover:border-primary hover:text-primary'}"
				>
					Todas
				</a>
				{#each data.categories as cat}
					<a
						href="/blog?categoria={cat.slug}"
						class="shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-colors {data.currentCategory === cat.slug ? 'bg-primary text-white border-primary' : 'bg-white text-dark/60 border-dark/10 hover:border-primary hover:text-primary'}"
					>
						{cat.name}
					</a>
				{/each}
			</nav>
		{/if}

		<!-- Articles Grid -->
		{#if rest.length > 0}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each rest as article}
					<a href="/blog/{article.slug}" class="group block">
						<div class="aspect-[16/10] rounded-xl overflow-hidden mb-4">
							<img
								src={getImageUrl(article.cover)}
								alt={article.title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								loading="lazy"
							/>
						</div>
						<div class="flex items-center gap-3 mb-2 text-xs">
							{#if article.category}
								<span class="font-bold uppercase tracking-wider text-accent">{article.category.name}</span>
								<span class="text-dark/20">|</span>
							{/if}
							<time class="text-dark/40">{formatDate(article.publishedAt)}</time>
						</div>
						<h2 class="font-skia text-xl text-dark leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
							{article.title}
						</h2>
						{#if article.excerpt}
							<p class="text-dark/50 text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
						{/if}
					</a>
				{/each}
			</div>
		{:else if data.articles.length === 0}
			<div class="text-center py-24 text-dark/40">
				<p class="text-lg">No hay artículos disponibles.</p>
			</div>
		{/if}

		<!-- Pagination -->
		{#if data.pagination && data.pagination.pageCount > 1}
			<div class="flex justify-center gap-2 mt-14">
				{#each Array(data.pagination.pageCount) as _, i}
					{@const pageNum = i + 1}
					<a
						href="/blog?page={pageNum}{data.currentCategory ? `&categoria=${data.currentCategory}` : ''}"
						class="w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors {data.pagination.page === pageNum ? 'bg-primary text-white' : 'bg-white text-dark/60 hover:bg-primary/10 hover:text-primary border border-dark/10'}"
					>
						{pageNum}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
