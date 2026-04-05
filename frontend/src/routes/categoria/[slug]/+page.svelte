<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.category.name} - Casona Texao</title>
	<meta name="description" content={data.category.description || `Artículos sobre ${data.category.name} en Casona Texao`} />
</svelte:head>

<div class="bg-cream min-h-screen">
	<div class="bg-primary text-white py-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h1 class="font-skia text-4xl mb-3">{data.category.name}</h1>
			{#if data.category.description}
				<p class="text-white/70">{data.category.description}</p>
			{/if}
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
		{#if data.articles.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each data.articles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		{:else}
			<div class="text-center py-20 text-dark/50">
				<p class="text-xl">No hay artículos en esta categoría.</p>
			</div>
		{/if}

		{#if data.pagination && data.pagination.pageCount > 1}
			<div class="flex justify-center gap-2 mt-12">
				{#each Array(data.pagination.pageCount) as _, i}
					{@const pageNum = i + 1}
					<a
						href="/categoria/{data.category.slug}?page={pageNum}"
						class="w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors {data.pagination.page === pageNum ? 'bg-primary text-white' : 'bg-white text-dark/70 hover:bg-primary/10'}"
					>
						{pageNum}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
