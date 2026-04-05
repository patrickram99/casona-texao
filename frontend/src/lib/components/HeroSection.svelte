<script lang="ts">
	let { title, subtitle, backgroundImage, cta }: {
		title: string;
		subtitle?: string;
		backgroundImage?: string;
		cta?: { label: string; href: string };
	} = $props();
</script>

<section
	class="relative min-h-[60vh] flex items-center justify-center text-center text-white overflow-hidden"
	style="background-image: url('{backgroundImage || '/images/placeholder.svg'}'); background-size: cover; background-position: center;"
>
	<div class="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark/80"></div>
	<div class="relative z-10 max-w-3xl mx-auto px-6 py-20">
		<h1 class="font-skia text-4xl md:text-6xl mb-4 leading-tight drop-shadow-lg">{title}</h1>
		{#if subtitle}
			<p class="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">{subtitle}</p>
		{/if}
		{#if cta}
			<a href={cta.href} class="inline-block bg-primary hover:bg-primary-light text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg">
				{cta.label}
			</a>
		{/if}
	</div>
</section>
