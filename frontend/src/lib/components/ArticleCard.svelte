<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { Article } from '$lib/types';

	let { article }: { article: Article } = $props();

	const dateFormatted = $derived(new Date(article.publishedAt).toLocaleDateString('es-PE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}));
</script>

<a href="/blog/{article.slug}" class="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
	<div class="aspect-[16/10] overflow-hidden">
		<img
			src={getImageUrl(article.cover)}
			alt={article.title}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			loading="lazy"
		/>
	</div>
	<div class="p-5">
		{#if article.category}
			<span class="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
				{article.category.name}
			</span>
		{/if}
		<h3 class="font-skia text-lg text-dark leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
			{article.title}
		</h3>
		{#if article.excerpt}
			<p class="text-sm text-dark/60 line-clamp-2 mb-3">{article.excerpt}</p>
		{/if}
		<time class="text-xs text-dark/40">{dateFormatted}</time>
	</div>
</a>
