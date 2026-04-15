<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { Article } from '$lib/types';

	let {
		articles = [],
	}: {
		articles: Article[];
	} = $props();

	let currentIndex = $state(0);
	let paused = $state(false);
	let autoplayTimer: ReturnType<typeof setInterval> | null = null;

	const maxIndex = $derived(Math.max(0, articles.length - 1));

	function goTo(index: number) {
		currentIndex = Math.max(0, Math.min(index, maxIndex));
	}

	function next() {
		goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
	}

	function prev() {
		goTo(currentIndex <= 0 ? maxIndex : currentIndex - 1);
	}

	function getCarouselImage(article: Article): string {
		return getImageUrl(article.featuredImage ?? article.cover);
	}

	function startAutoplay(count: number) {
		stopAutoplay();
		if (count > 1) {
			autoplayTimer = setInterval(() => {
				if (!paused) next();
			}, 6000);
		}
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	$effect(() => {
		const count = articles.length;
		startAutoplay(count);
		return () => stopAutoplay();
	});
</script>

{#if articles.length > 0}
<section
	class="featured-carousel"
	onmouseenter={() => paused = true}
	onmouseleave={() => paused = false}
	role="region"
	aria-label="Publicaciones Destacadas"
>
	<div class="carousel-viewport">
		<div
			class="carousel-track"
			style="transform: translateX(-{currentIndex * 100}%)"
		>
			{#each articles as article, i}
				<a
					href="/blog/{article.slug}"
					class="carousel-slide"
					style="background-image: url('{getCarouselImage(article)}')"
					aria-hidden={i !== currentIndex}
				>
					<div class="slide-overlay"></div>
					<div class="slide-content">
						{#if article.category}
							<span class="slide-category">{article.category.name}</span>
						{/if}
						<h2 class="slide-title">{article.title}</h2>
						{#if article.excerpt}
							<p class="slide-excerpt">{article.excerpt}</p>
						{/if}
						<span class="slide-cta">Leer más →</span>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- Navigation arrows -->
	{#if articles.length > 1}
		<button
			onclick={prev}
			class="carousel-arrow carousel-arrow-left"
			aria-label="Anterior"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
		</button>
		<button
			onclick={next}
			class="carousel-arrow carousel-arrow-right"
			aria-label="Siguiente"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
		</button>

		<!-- Dots -->
		<div class="carousel-dots">
			{#each articles as _, i}
				<button
					onclick={() => goTo(i)}
					class="carousel-dot {currentIndex === i ? 'active' : ''}"
					aria-label="Ir a slide {i + 1}"
				></button>
			{/each}
		</div>
	{/if}
</section>
{/if}

<style>
	.featured-carousel {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	.carousel-viewport {
		width: 100%;
		overflow: hidden;
	}

	.carousel-track {
		display: flex;
		transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.carousel-slide {
		min-width: 100%;
		position: relative;
		aspect-ratio: 21 / 9;
		background-size: cover;
		background-position: center;
		display: flex;
		align-items: flex-end;
		text-decoration: none;
		color: white;
	}

	@media (max-width: 768px) {
		.carousel-slide {
			aspect-ratio: 16 / 10;
		}
	}

	.slide-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.75) 0%,
			rgba(0, 0, 0, 0.3) 40%,
			rgba(0, 0, 0, 0.05) 100%
		);
	}

	.slide-content {
		position: relative;
		z-index: 1;
		padding: 2rem 3rem;
		max-width: 700px;
	}

	@media (max-width: 768px) {
		.slide-content {
			padding: 1.5rem 1.25rem;
		}
	}

	.slide-category {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(8px);
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		margin-bottom: 0.75rem;
	}

	.slide-title {
		font-family: 'Skia', serif;
		font-size: clamp(1.4rem, 3vw, 2.4rem);
		line-height: 1.2;
		margin-bottom: 0.5rem;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	.slide-excerpt {
		font-size: 0.875rem;
		line-height: 1.5;
		opacity: 0.85;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-bottom: 0.75rem;
		max-width: 500px;
	}

	.slide-cta {
		font-size: 0.8rem;
		font-weight: 600;
		opacity: 0.9;
		transition: opacity 0.2s;
	}

	.carousel-slide:hover .slide-cta {
		opacity: 1;
	}

	.carousel-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 3rem;
		height: 3rem;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s;
		opacity: 0;
		z-index: 10;
	}

	.featured-carousel:hover .carousel-arrow {
		opacity: 1;
	}

	.carousel-arrow:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.carousel-arrow-left {
		left: 1rem;
	}

	.carousel-arrow-right {
		right: 1rem;
	}

	.carousel-dots {
		position: absolute;
		bottom: 1.25rem;
		right: 2rem;
		display: flex;
		gap: 0.5rem;
		z-index: 10;
	}

	.carousel-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.4);
		border: none;
		cursor: pointer;
		transition: all 0.3s;
		padding: 0;
	}

	.carousel-dot.active {
		background: white;
		width: 1.5rem;
	}
</style>
