<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	let { data } = $props();

	const services = [
		{ icon: '🎭', title: 'Teatro', desc: 'Producciones y obras en vivo' },
		{ icon: '🎵', title: 'Música', desc: 'Conciertos y recitales' },
		{ icon: '🎨', title: 'Arte', desc: 'Exposiciones y talleres' },
		{ icon: '💬', title: 'Charlas', desc: 'Conversatorios culturales' },
		{ icon: '🎪', title: 'Festivales', desc: 'Eventos y celebraciones' },
	];
</script>

<svelte:head>
	<title>Casona Texao - Centro Cultural en Arequipa</title>
	<meta name="description" content="Centro Cultural Casona Texao - Donde convergen el arte, la cultura y la música en Arequipa, Perú. Charlas, teatro, eventos culturales." />
</svelte:head>

<!-- Hero -->
<HeroSection
	title="Casona Texao"
	subtitle="Donde convergen el arte, la cultura y la música"
	cta={{ label: 'Reservar por WhatsApp', href: 'https://wa.me/51999999999' }}
/>

<!-- Services -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="font-skia text-3xl text-center text-primary mb-12">Nuestros Espacios</h2>
		<div class="grid grid-cols-2 md:grid-cols-5 gap-6">
			{#each services as service}
				<div class="text-center p-6 rounded-xl hover:bg-cream transition-colors">
					<div class="text-4xl mb-3">{service.icon}</div>
					<h3 class="font-skia text-lg text-dark mb-1">{service.title}</h3>
					<p class="text-sm text-dark/60">{service.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Categories -->
{#if data.categories.length > 0}
	<section class="py-16 bg-cream">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="font-skia text-3xl text-center text-primary mb-12">Explora por Categoría</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each data.categories.slice(0, 3) as category}
					<a
						href="/categoria/{category.slug}"
						class="group relative block bg-primary rounded-xl overflow-hidden aspect-[3/2] shadow-md hover:shadow-xl transition-all"
					>
						<div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
						<div class="absolute bottom-0 left-0 right-0 p-6 text-white">
							<h3 class="font-skia text-2xl mb-1">{category.name}</h3>
							{#if category.description}
								<p class="text-sm text-white/70">{category.description}</p>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Mission / Vision -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="text-center p-8">
				<div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
				</div>
				<h3 class="font-skia text-xl text-primary mb-3">Misión</h3>
				<p class="text-dark/70 text-sm leading-relaxed">Promover el desarrollo cultural y artístico de Arequipa a través de charlas, teatro, música, festivales y eventos que celebren nuestra identidad.</p>
			</div>
			<div class="text-center p-8">
				<div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
				</div>
				<h3 class="font-skia text-xl text-primary mb-3">Visión</h3>
				<p class="text-dark/70 text-sm leading-relaxed">Ser el centro cultural de referencia en el sur del Perú, donde artistas, gestores culturales y la comunidad converjan para crear y transformar.</p>
			</div>
			<div class="text-center p-8">
				<div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
				</div>
				<h3 class="font-skia text-xl text-primary mb-3">Valores</h3>
				<p class="text-dark/70 text-sm leading-relaxed">Inclusión, creatividad, compromiso comunitario, respeto por el patrimonio y pasión por las artes.</p>
			</div>
		</div>
	</div>
</section>

<!-- Recent Articles -->
{#if data.articles.length > 0}
	<section class="py-16 bg-cream">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between mb-10">
				<h2 class="font-skia text-3xl text-primary">Últimas Publicaciones</h2>
				<a href="/blog" class="text-primary hover:text-primary-light font-medium text-sm transition-colors">
					Ver todas &rarr;
				</a>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each data.articles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- About Teaser -->
<section class="py-16 bg-primary text-white">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="font-skia text-3xl mb-6">Sobre Casona Texao</h2>
		<p class="text-white/80 text-lg leading-relaxed mb-8">
			Ubicada en el corazón del Centro Histórico de Arequipa, la Casona Texao es un espacio cultural
			reconocido como Punto de Cultura por el Ministerio de Cultura del Perú. Desde nuestra emblemática
			sede en la Calle Puente Grau 108, abrimos las puertas a la comunidad arequipeña y al mundo.
		</p>
		<a href="/nosotros" class="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-cream transition-colors">
			Conoce Nuestra Historia
		</a>
	</div>
</section>

<!-- Google Maps -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="font-skia text-3xl text-center text-primary mb-8">Encuéntranos</h2>
		<div class="rounded-xl overflow-hidden shadow-lg aspect-[16/6]">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.3!2d-71.537!3d-16.399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s=ChIJZXT4EQBLQpERst-1U1zGOr4!2sCasona+Texao!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
				width="100%"
				height="100%"
				style="border:0;"
				allowfullscreen
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				title="Ubicación de Casona Texao"
			></iframe>
		</div>
		<p class="text-center text-dark/60 mt-4 text-sm">Calle Puente Grau 108, Cercado, Arequipa, Perú</p>
	</div>
</section>
