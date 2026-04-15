<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Aliados from '$lib/components/Aliados.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import FeaturedCarousel from '$lib/components/FeaturedCarousel.svelte';
	import { getImageUrl } from '$lib/api';

	let { data } = $props();

	let showTeam = false;

	const services = [
		{ icon: '🎭', title: 'Teatro', slug: 'teatro', desc: 'Producciones y obras en vivo' },
		{ icon: '🎵', title: 'Música', slug: 'musica', desc: 'Conciertos y recitales' },
		{ icon: '🎨', title: 'Arte', slug: 'arte', desc: 'Exposiciones y talleres' },
		{ icon: '💬', title: 'Charlas', slug: 'charlas', desc: 'Conversatorios culturales' },
		{ icon: '🎪', title: 'Festivales', slug: 'festivales', desc: 'Eventos y celebraciones' },
	];

	const team = [
		{ fullName: 'Nombre Apellido', role: 'Director General', initials: 'NA' },
		{ fullName: 'Nombre Apellido', role: 'Coordinación de Eventos', initials: 'NA' },
		{ fullName: 'Nombre Apellido', role: 'Gestión Cultural', initials: 'NA' },
		{ fullName: 'Nombre Apellido', role: 'Producción Artística', initials: 'NA' },
		{ fullName: 'Nombre Apellido', role: 'Comunicaciones', initials: 'NA' },
		{ fullName: 'Nombre Apellido', role: 'Voluntariado', initials: 'NA' },
	];

	const galleryImages = $derived(
		data.galleryArticles
			.flatMap((a: any) =>
				(a.gallery || []).map((img: any) => ({
					url: getImageUrl(img),
					title: a.title,
					slug: a.slug,
				}))
			)
			.slice(0, 12)
	);

	// Only show events that have an eventDate set (upcoming events)
	const eventCards = $derived(data.upcomingEvents);

	const heroImage = $derived(
		data.globalConfig?.heroImage ? getImageUrl(data.globalConfig.heroImage) : '/images/hero.png'
	);

	const certificateImage = $derived(
		data.globalConfig?.certificateImage ? getImageUrl(data.globalConfig.certificateImage) : null
	);

	const puntoDeCulturaLink = $derived(data.globalConfig?.puntoDeCulturaLink ?? null);
</script>

<svelte:head>
	<title>Casona Texao - Centro Cultural en Arequipa</title>
	<meta name="description" content="Centro Cultural Casona Texao - Donde convergen el arte, la cultura y la música en Arequipa, Perú. Charlas, teatro, eventos culturales." />
</svelte:head>

<!-- Hero: show static hero only if no featured articles, otherwise the carousel IS the hero -->
{#if data.featuredArticles.length > 0}
	<FeaturedCarousel articles={data.featuredArticles} />
{:else}
	<HeroSection
		title="Casona Texao"
		subtitle="Donde convergen el arte, la cultura y la música"
		backgroundImage={heroImage}
		cta={{ label: 'Reservar por WhatsApp', href: 'https://wa.me/51920779580' }}
	/>
{/if}

<!-- Services -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="font-skia text-3xl text-center text-primary mb-12">Nuestros Espacios</h2>
		<div class="grid grid-cols-2 md:grid-cols-5 gap-6">
			{#each services as service}
				<a href="/blog?categoria={service.slug}" class="group text-center p-6 rounded-xl hover:bg-cream transition-colors">
					<div class="text-4xl mb-3">{service.icon}</div>
					<h3 class="font-skia text-lg text-dark mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
					<p class="text-sm text-dark/60">{service.desc}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Eventos del Mes -->
{#if eventCards.length > 0}
	<section class="py-16 bg-cream">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between mb-10">
				<h2 class="font-skia text-3xl text-primary">Eventos del Mes</h2>
				<a href="/blog" class="text-primary hover:text-primary-light font-medium text-sm transition-colors">
					Ver todos &rarr;
				</a>
			</div>
			<Carousel itemCount={eventCards.length} visibleItems={3} autoplay={true} interval={5000}>
				{#each eventCards as article}
					<a href="/blog/{article.slug}" class="group snap-start shrink-0 w-72 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
						<div class="aspect-[16/10] overflow-hidden relative">
							<img
								src={getImageUrl(article.cover)}
								alt={article.title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								loading="lazy"
							/>
							{#if article.category}
								{@const svc = services.find(s => s.title === article.category?.name)}
								{#if svc}
									<span class="absolute top-3 left-3 bg-dark/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
										{svc.icon} {svc.title}
									</span>
								{/if}
							{/if}
						</div>
						<div class="p-4">
							<h3 class="font-skia text-base text-dark leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
								{article.title}
							</h3>
							{#if article.excerpt}
								<p class="text-xs text-dark/50 line-clamp-2 mb-3">{article.excerpt}</p>
							{/if}
							<div class="flex items-center justify-between">
								{#if article.eventDate}
									<time class="text-xs text-dark/40">
										{new Date(article.eventDate + 'T00:00:00').toLocaleDateString('es-PE', { day: 'numeric', month: 'long' })}
										{#if article.eventTime}
											<span class="text-primary font-medium"> {article.eventTime.slice(0, 5)}</span>
										{/if}
									</time>
								{/if}
								<span class="text-xs text-primary font-medium">Ver más</span>
							</div>
						</div>
					</a>
				{/each}
			</Carousel>
		</div>
	</section>
{/if}

<!-- Gallery Preview -->
{#if galleryImages.length > 0}
	<section class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="font-skia text-3xl text-center text-primary mb-12">Galería de Eventos</h2>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
				{#each galleryImages as img, i}
					<a
						href="/blog/{img.slug}"
						class="group relative overflow-hidden rounded-lg {i === 0 ? 'md:col-span-2 md:row-span-2' : ''}"
					>
						<div class="aspect-square overflow-hidden">
							<img
								src={img.url}
								alt={img.title}
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								loading="lazy"
							/>
						</div>
						<div class="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<div class="absolute bottom-0 left-0 right-0 p-4">
								<p class="text-white text-sm font-medium line-clamp-2">{img.title}</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
			<div class="text-center mt-8">
				<a href="/blog" class="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-full transition-colors">
					Ver Más Eventos
				</a>
			</div>
		</div>
	</section>
{/if}

<!-- Mission / Vision -->
<section class="py-16 bg-cream">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="text-center p-8 bg-white rounded-xl shadow-sm">
				<div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
				</div>
				<h3 class="font-skia text-xl text-primary mb-3">Misión</h3>
				<p class="text-dark/70 text-sm leading-relaxed">Promover el desarrollo cultural y artístico de Arequipa a través de charlas, teatro, música, festivales y eventos que celebren nuestra identidad.</p>
			</div>
			<div class="text-center p-8 bg-white rounded-xl shadow-sm">
				<div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
				</div>
				<h3 class="font-skia text-xl text-primary mb-3">Visión</h3>
				<p class="text-dark/70 text-sm leading-relaxed">Ser el centro cultural de referencia en el sur del Perú, donde artistas, gestores culturales y la comunidad converjan para crear y transformar.</p>
			</div>
			<div class="text-center p-8 bg-white rounded-xl shadow-sm">
				<div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
				</div>
				<h3 class="font-skia text-xl text-primary mb-3">Valores</h3>
				<p class="text-dark/70 text-sm leading-relaxed">Inclusión, creatividad, compromiso comunitario, respeto por el patrimonio y pasión por las artes.</p>
			</div>
		</div>
	</div>
</section>

<!-- Nuestro Equipo -->
{#if showTeam}
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between mb-10">
			<h2 class="font-skia text-3xl text-primary">Nuestro Equipo</h2>
			<a href="/nosotros#equipo" class="text-primary hover:text-primary-light font-medium text-sm transition-colors">
				Conócenos &rarr;
			</a>
		</div>
		<Carousel itemCount={team.length} visibleItems={4} autoplay={true} interval={4000}>
			{#each team as member}
				<a
					href="/nosotros#equipo"
					class="group snap-start shrink-0 w-52 bg-cream rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
				>
					<div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
						<span class="font-skia text-xl text-primary">{member.initials}</span>
					</div>
					<h3 class="font-semibold text-sm text-dark mb-1">{member.fullName}</h3>
					<p class="text-xs text-accent font-medium">{member.role}</p>
				</a>
			{/each}
		</Carousel>
	</div>
</section>
{/if}

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

<!-- Nuestra Historia -->
<section class="py-20 bg-white">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="font-skia text-3xl text-center text-primary mb-10">Sobre Casona Texao</h2>

		<blockquote class="text-dark/70 text-lg leading-relaxed italic border-l-4 border-accent pl-6 mb-3">
			"El año de 1825 se botó una huerta de San Francisco y se formó la hermosa cuadra llamada Ayacucho, donde se han fabricado casas magníficas..."
		</blockquote>
		<p class="text-xs text-dark/40 mb-10 pl-6">— Diario del viaje del presidente Orbegoso al sur del Perú (1835)</p>

		<p class="text-dark/70 leading-relaxed mb-4">
			Casona Colonial, bella pieza Arquitectónica enclavada en la zona monumental en el Centro de la Ciudad de Arequipa.
		</p>
		<p class="text-dark/70 leading-relaxed mb-8">
			Allí ustedes podrán disfrutar del encanto especial de una vieja Casona Restaurada que sólo la historia y el paso del tiempo confieren a estas edificaciones, en ella se resume un estilo de vida sereno y amable en plena armonía con el pasado y la naturaleza.
		</p>

		<a href="/nosotros" class="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold text-sm transition-colors">
			Conoce nuestra historia completa
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
		</a>
	</div>
</section>

<!-- Reconocimientos -->
<section class="py-16 bg-primary text-white">
	<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
			<!-- Punto de Cultura -->
			<div class="flex-1">
				<p class="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Ministerio de Cultura del Perú</p>
				<h3 class="font-skia text-2xl mb-3">Punto de Cultura · Registro N.º 818</h3>
				<p class="text-white/70 text-sm leading-relaxed mb-4">
					Reconocidos mediante Resolución Directoral N° 000995-2025-DGIA-VMPCIC/MC por nuestra labor desde el arte y la cultura con incidencia comunitaria.
				</p>
				{#if puntoDeCulturaLink}
					<a
						href={puntoDeCulturaLink}
						target="_blank"
						rel="noopener"
						class="text-accent hover:text-white text-sm font-semibold transition-colors"
					>
						Ver resolución oficial →
					</a>
				{/if}
			</div>

			<!-- Divider -->
			<div class="hidden md:block w-px h-28 bg-white/20"></div>
			<div class="md:hidden h-px w-full bg-white/20"></div>

			<!-- RENTOCA -->
			<div class="flex-1">
				<p class="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">RENTOCA</p>
				<h3 class="font-skia text-2xl mb-3">Registro Nacional de Cultura y Artes</h3>
				<p class="text-white/70 text-sm leading-relaxed">
					CR N° REN-OPJ-039352-25 · Vigencia Indeterminada
				</p>
			</div>
		</div>

		<!-- Certificate image if uploaded -->
		{#if certificateImage}
			<div class="mt-12 max-w-md mx-auto">
				<img
					src={certificateImage}
					alt="Certificado RENTOCA - Centro Cultural Texao"
					class="w-full h-auto rounded-lg opacity-90"
					loading="lazy"
				/>
			</div>
		{/if}
	</div>
</section>

<!-- Aliados -->
<Aliados />

<!-- Google Maps -->
<section class="py-16 bg-cream">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="font-skia text-3xl text-center text-primary mb-8">Encuéntranos</h2>
		<div class="rounded-xl overflow-hidden shadow-lg aspect-[16/6]">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.594864620904!2d-71.5339723!3d-16.3945877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424b0011f87465%3A0xbe3ac65c53b5bfd2!2sCasona%20Texao%20Centro%20Cultural!5e0!3m2!1sen!2spe!4v1776208316750!5m2!1sen!2spe"
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
