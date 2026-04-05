<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog - Casona Texao</title>
	<meta name="description" content="Artículos sobre cultura, teatro, charlas y eventos en Casona Texao, Arequipa." />
</svelte:head>

<div class="bg-cream min-h-screen">
	<!-- Header -->
	<div class="bg-primary text-white py-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h1 class="font-skia text-4xl mb-3">Blog</h1>
			<p class="text-white/70">Artículos sobre cultura, teatro, charlas y eventos</p>
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
		<!-- Category filter -->
		{#if data.categories.length > 0}
			<div class="flex flex-wrap gap-2 mb-8 justify-center">
				<a
					href="/blog"
					class="px-4 py-2 rounded-full text-sm font-medium transition-colors {!data.currentCategory ? 'bg-primary text-white' : 'bg-white text-dark/70 hover:bg-primary/10'}"
				>
					Todas
				</a>
				{#each data.categories as cat}
					<a
						href="/blog?categoria={cat.slug}"
						class="px-4 py-2 rounded-full text-sm font-medium transition-colors {data.currentCategory === cat.slug ? 'bg-primary text-white' : 'bg-white text-dark/70 hover:bg-primary/10'}"
					>
						{cat.name}
					</a>
				{/each}
			</div>
		{/if}

		<!-- Articles Grid -->
		{#if data.articles.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each data.articles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		{:else}
			<div class="text-center py-20 text-dark/50">
				<p class="text-xl">No hay artículos disponibles.</p>
			</div>
		{/if}

		<!-- Pagination -->
		{#if data.pagination && data.pagination.pageCount > 1}
			<div class="flex justify-center gap-2 mt-12">
				{#each Array(data.pagination.pageCount) as _, i}
					{@const pageNum = i + 1}
					<a
						href="/blog?page={pageNum}{data.currentCategory ? `&categoria=${data.currentCategory}` : ''}"
						class="w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors {data.pagination.page === pageNum ? 'bg-primary text-white' : 'bg-white text-dark/70 hover:bg-primary/10'}"
					>
						{pageNum}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
