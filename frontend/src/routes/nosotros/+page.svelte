<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import Aliados from '$lib/components/Aliados.svelte';
	import { getImageUrl } from '$lib/api';

	let { data } = $props();

	const team = [
		{ fullName: 'Nombre Apellido', role: 'Director General', initials: 'NA', desc: 'Lidera la visión cultural y artística de Casona Texao, construyendo puentes entre la tradición y la innovación creativa.' },
		{ fullName: 'Nombre Apellido', role: 'Coordinación de Eventos', initials: 'NA', desc: 'Organiza charlas, obras de teatro y festivales, asegurando que cada evento sea una experiencia memorable.' },
		{ fullName: 'Nombre Apellido', role: 'Gestión Cultural', initials: 'NA', desc: 'Conecta artistas, gestores culturales y la comunidad arequipeña en un ecosistema creativo.' },
		{ fullName: 'Nombre Apellido', role: 'Producción Artística', initials: 'NA', desc: 'Da vida a las producciones teatrales, musicales y artísticas que hacen de nuestra casona un escenario vivo.' },
		{ fullName: 'Nombre Apellido', role: 'Comunicaciones', initials: 'NA', desc: 'Difunde nuestra cultura a través de medios y redes sociales, acercando el arte a la comunidad.' },
		{ fullName: 'Nombre Apellido', role: 'Voluntariado', initials: 'NA', desc: 'Jóvenes comprometidos que donan su tiempo y talento para hacer de Arequipa un lugar mejor.' },
	];

	const values = [
		{ title: 'Inclusión', desc: 'La cultura es para todos, sin distinción.', icon: '🤝' },
		{ title: 'Creatividad', desc: 'Fomentamos la expresión artística en todas sus formas.', icon: '💡' },
		{ title: 'Compromiso', desc: 'Trabajamos por y para nuestra comunidad.', icon: '🏛️' },
		{ title: 'Patrimonio', desc: 'Valoramos y preservamos nuestra herencia cultural.', icon: '🏺' },
		{ title: 'Pasión', desc: 'El arte es el motor de nuestra transformación social.', icon: '🔥' },
	];

	let showTeam = false;

	const heroImage = $derived(
		data.globalConfig?.nosotrosHeroImage ? getImageUrl(data.globalConfig.nosotrosHeroImage) : undefined
	);
</script>

<svelte:head>
	<title>Nosotros - Casona Texao</title>
	<meta name="description" content="Conoce la historia y misión del Centro Cultural Casona Texao en Arequipa, Perú." />
</svelte:head>

<HeroSection
	title="Nosotros"
	subtitle="Conoce nuestra historia y misión"
	backgroundImage={heroImage}
/>

<!-- Historia -->
<section class="py-20 bg-white">
	<div class="max-w-5xl mx-auto px-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
			<div>
				<span class="text-accent text-sm font-bold uppercase tracking-wider">Nuestra Historia</span>
				<h2 class="font-skia text-3xl text-dark mt-2 mb-6">Un espacio donde la cultura vive</h2>
				<p class="text-dark/70 leading-relaxed mb-4">
					La Casona Texao es un espacio cultural ubicado en el corazón del Centro Histórico de Arequipa,
					en la emblemática Calle Puente Grau 108. Reconocida como Punto de Cultura por el Ministerio de
					Cultura del Perú, nuestra misión es democratizar el acceso al arte y la cultura.
				</p>
				<p class="text-dark/70 leading-relaxed">
					Desde nuestra fundación, hemos trabajado para crear un espacio donde artistas, gestores culturales
					y la comunidad arequipeña puedan converger para crear, aprender y transformar.
				</p>
			</div>
			<div class="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-8 flex items-center justify-center aspect-square">
				<img src="/images/logo-texao.png" alt="Casona Texao" class="w-48 h-48 object-contain" />
			</div>
		</div>
	</div>
</section>

<!-- Punto de Cultura -->
<section class="py-16 bg-primary text-white">
	<div class="max-w-4xl mx-auto px-6 text-center">
		<span class="text-accent text-sm font-bold uppercase tracking-wider">Reconocimiento</span>
		<h2 class="font-skia text-3xl mt-2 mb-6">Punto de Cultura</h2>
		<p class="text-white/75 text-lg leading-relaxed max-w-3xl mx-auto">
			Casona Texao es uno de los Puntos de Cultura reconocidos por el Ministerio de Cultura del Perú
			bajo la Ley N° 30487. Este reconocimiento avala nuestro compromiso con el desarrollo cultural
			comunitario y nos integra a una red nacional de organizaciones que utilizan la creatividad como
			herramienta de cambio social.
		</p>
	</div>
</section>

<!-- Misión y Visión -->
<section class="py-20 bg-cream">
	<div class="max-w-5xl mx-auto px-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div class="bg-white rounded-2xl p-10 shadow-sm">
				<span class="text-accent text-sm font-bold uppercase tracking-wider">Misión</span>
				<h3 class="font-skia text-2xl text-dark mt-2 mb-4">Por qué existimos</h3>
				<p class="text-dark/70 leading-relaxed">
					Promover el desarrollo cultural y artístico de Arequipa a través de charlas, teatro, música,
					festivales y eventos que celebren nuestra identidad y patrimonio, haciendo de la cultura un
					derecho accesible para todos.
				</p>
			</div>
			<div class="bg-white rounded-2xl p-10 shadow-sm">
				<span class="text-accent text-sm font-bold uppercase tracking-wider">Visión</span>
				<h3 class="font-skia text-2xl text-dark mt-2 mb-4">Hacia dónde vamos</h3>
				<p class="text-dark/70 leading-relaxed">
					Ser el centro cultural de referencia en el sur del Perú, donde artistas, gestores culturales
					y la comunidad converjan para crear, aprender y transformar la realidad a través del arte.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Valores -->
<section class="py-16 bg-white">
	<div class="max-w-5xl mx-auto px-6">
		<h2 class="font-skia text-3xl text-center text-primary mb-12">Nuestros Valores</h2>
		<div class="grid grid-cols-2 md:grid-cols-5 gap-6">
			{#each values as value}
				<div class="text-center">
					<div class="text-3xl mb-3">{value.icon}</div>
					<h3 class="font-skia text-base text-dark mb-1">{value.title}</h3>
					<p class="text-xs text-dark/50 leading-relaxed">{value.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Nuestro Equipo -->
{#if showTeam}
<section id="equipo" class="py-20 bg-cream">
	<div class="max-w-6xl mx-auto px-6">
		<div class="text-center mb-12">
			<span class="text-accent text-sm font-bold uppercase tracking-wider">Quiénes somos</span>
			<h2 class="font-skia text-3xl text-primary mt-2">Nuestro Equipo</h2>
			<p class="text-dark/50 mt-3 max-w-xl mx-auto">
				Detrás de cada evento, cada obra y cada charla hay un equipo comprometido con la cultura arequipeña.
			</p>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each team as member}
				<div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
					<div class="h-44 bg-gradient-to-br from-primary/5 via-accent/10 to-cream flex items-center justify-center">
						<div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
							<span class="font-skia text-2xl text-primary">{member.initials}</span>
						</div>
					</div>
					<div class="p-6 text-center">
						<h3 class="font-semibold text-dark text-lg">{member.fullName}</h3>
						<p class="text-accent text-sm font-medium mb-3">{member.role}</p>
						<p class="text-sm text-dark/50 leading-relaxed">{member.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Aliados -->
<Aliados />

<!-- Ubicación -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-6">
		<h2 class="font-skia text-3xl text-center text-primary mb-8">Nuestra Ubicación</h2>
		<div class="rounded-2xl overflow-hidden shadow-lg aspect-[16/6]">
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
		<p class="text-center text-dark/50 mt-4 text-sm">Calle Puente Grau 108, Cercado, Arequipa, Perú</p>
	</div>
</section>
