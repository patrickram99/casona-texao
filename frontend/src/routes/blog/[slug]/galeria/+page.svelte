<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';

	let { data } = $props();

	const images = $derived(data.article.gallery || []);
</script>

<svelte:head>
	<title>Galería - {data.article.title} - Casona Texao</title>
</svelte:head>

<div class="bg-cream min-h-screen">
	<div class="bg-primary text-white py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<a href="/blog/{data.article.slug}" class="text-white/60 hover:text-white text-sm mb-2 inline-block">&larr; Volver al artículo</a>
			<h1 class="font-skia text-3xl">Galería: {data.article.title}</h1>
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
		{#if images.length > 0}
			<Gallery {images} />
		{:else}
			<div class="text-center py-20 text-dark/50">
				<p>No hay imágenes en esta galería.</p>
			</div>
		{/if}
	</div>
</div>
