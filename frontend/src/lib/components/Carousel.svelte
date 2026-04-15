<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		itemCount,
		visibleItems = 3,
		autoplay = true,
		interval = 4000,
		children,
	}: {
		itemCount: number;
		visibleItems?: number;
		autoplay?: boolean;
		interval?: number;
		children: Snippet;
	} = $props();

	let currentIndex = $state(0);
	let trackEl: HTMLDivElement | undefined = $state();
	let autoplayTimer: ReturnType<typeof setInterval> | null = null;
	let paused = $state(false);

	const maxIndex = $derived(Math.max(0, itemCount - visibleItems));

	function goTo(index: number) {
		currentIndex = Math.max(0, Math.min(index, maxIndex));
		if (trackEl) {
			const child = trackEl.children[currentIndex] as HTMLElement;
			if (child) {
				trackEl.scrollTo({ left: child.offsetLeft - trackEl.offsetLeft, behavior: 'smooth' });
			}
		}
	}

	function next() {
		goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
	}

	function prev() {
		goTo(currentIndex <= 0 ? maxIndex : currentIndex - 1);
	}

	function startAutoplay() {
		stopAutoplay();
		if (autoplay && itemCount > visibleItems) {
			autoplayTimer = setInterval(() => {
				if (!paused) next();
			}, interval);
		}
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	$effect(() => {
		startAutoplay();
		return () => stopAutoplay();
	});
</script>

<div
	class="relative group"
	onmouseenter={() => paused = true}
	onmouseleave={() => paused = false}
	role="region"
	aria-label="Carousel"
>
	<!-- Track -->
	<div
		bind:this={trackEl}
		class="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
		style="scrollbar-width: none; -ms-overflow-style: none;"
	>
		{@render children()}
	</div>

	<!-- Nav buttons -->
	{#if itemCount > visibleItems}
		<button
			onclick={prev}
			class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100 z-10"
			aria-label="Anterior"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
		</button>
		<button
			onclick={next}
			class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100 z-10"
			aria-label="Siguiente"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
		</button>

		<!-- Dots -->
		<div class="flex justify-center gap-2 mt-4">
			{#each Array(Math.min(itemCount, maxIndex + 1)) as _, i}
				<button
					onclick={() => goTo(i)}
					class="w-2 h-2 rounded-full transition-all {currentIndex === i ? 'bg-primary w-6' : 'bg-dark/20 hover:bg-dark/40'}"
					aria-label="Ir a slide {i + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	div :global(::-webkit-scrollbar) {
		display: none;
	}
</style>
