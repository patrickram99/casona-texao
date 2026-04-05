<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { StrapiImage } from '$lib/types';

	let { images }: { images: StrapiImage[] } = $props();
	let lightboxIndex = $state(-1);

	function openLightbox(index: number) {
		lightboxIndex = index;
	}

	function closeLightbox() {
		lightboxIndex = -1;
	}

	function prev() {
		lightboxIndex = lightboxIndex > 0 ? lightboxIndex - 1 : images.length - 1;
	}

	function next() {
		lightboxIndex = lightboxIndex < images.length - 1 ? lightboxIndex + 1 : 0;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (lightboxIndex < 0) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
	{#each images as image, i}
		<button
			class="aspect-square overflow-hidden rounded-lg cursor-pointer group"
			onclick={() => openLightbox(i)}
		>
			<img
				src={getImageUrl(image)}
				alt={image.alternativeText || `Imagen ${i + 1}`}
				class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
				loading="lazy"
			/>
		</button>
	{/each}
</div>

<!-- Lightbox -->
{#if lightboxIndex >= 0}
	<div class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" role="dialog">
		<button class="absolute top-4 right-4 text-white/80 hover:text-white text-4xl z-10" onclick={closeLightbox}>
			&times;
		</button>
		<button class="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl z-10" onclick={prev}>
			&#8249;
		</button>
		<button class="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl z-10" onclick={next}>
			&#8250;
		</button>
		<img
			src={getImageUrl(images[lightboxIndex])}
			alt={images[lightboxIndex].alternativeText || ''}
			class="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
		/>
		<div class="absolute bottom-4 text-white/60 text-sm">
			{lightboxIndex + 1} / {images.length}
		</div>
	</div>
{/if}
