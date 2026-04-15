<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import { getImageUrl } from '$lib/api';

	let { data } = $props();

	const contactOptions = [
		{
			title: 'Alquilar el Espacio',
			desc: 'Organiza tu evento en nuestra casona colonial.',
			message: 'Hola, me gustaría alquilar el espacio de Casona Texao para un evento.',
		},
		{
			title: 'Reservar para Eventos',
			desc: 'Asiste a nuestras charlas, obras de teatro y festivales.',
			message: 'Hola, me gustaría reservar para un evento en Casona Texao.',
		},
		{
			title: 'Consulta General',
			desc: 'Cualquier pregunta sobre nuestros servicios.',
			message: 'Hola, tengo una consulta sobre Casona Texao.',
		},
	];

	const services = [
		{ icon: '🏛️', title: 'Centro Cultural', desc: 'Espacio para la difusión y creación cultural' },
		{ icon: '🎭', title: 'Teatro', desc: 'Sala para producciones teatrales y performances' },
		{ icon: '🎵', title: 'Música', desc: 'Conciertos acústicos, recitales y jam sessions' },
		{ icon: '🎨', title: 'Arte', desc: 'Exposiciones, talleres y residencias artísticas' },
		{ icon: '🎪', title: 'Festivales', desc: 'Eventos culturales y celebraciones comunitarias' },
	];

	const heroImage = $derived(
		data.globalConfig?.contactoHeroImage ? getImageUrl(data.globalConfig.contactoHeroImage) : undefined
	);
</script>

<svelte:head>
	<title>Contacto - Casona Texao</title>
	<meta name="description" content="Contacta al Centro Cultural Casona Texao en Arequipa. Alquiler de espacio, reservas y consultas." />
</svelte:head>

<HeroSection
	title="Contacto"
	subtitle="Estamos para ayudarte"
	backgroundImage={heroImage}
/>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
	<!-- Contact options via WhatsApp -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
		{#each contactOptions as option}
			<div class="bg-white rounded-xl p-8 shadow-sm text-center">
				<h3 class="font-skia text-xl text-primary mb-3">{option.title}</h3>
				<p class="text-dark/60 text-sm mb-6">{option.desc}</p>
				<a
					href="https://wa.me/51920779580?text={encodeURIComponent(option.message)}"
					target="_blank"
					rel="noopener"
					class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
					Escribir por WhatsApp
				</a>
			</div>
		{/each}
	</div>

	<!-- Services -->
	<h2 class="font-skia text-3xl text-center text-primary mb-10">Nuestros Servicios</h2>
	<div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
		{#each services as service}
			<div class="text-center p-6 bg-white rounded-xl shadow-sm">
				<div class="text-4xl mb-3">{service.icon}</div>
				<h3 class="font-skia text-lg text-dark mb-2">{service.title}</h3>
				<p class="text-sm text-dark/60">{service.desc}</p>
			</div>
		{/each}
	</div>

	<!-- Info -->
	<div class="bg-white rounded-xl p-8 shadow-sm mb-16">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>
				<h3 class="font-skia text-xl text-primary mb-4">Dirección</h3>
				<p class="text-dark/70 mb-2">Calle Puente Grau 108</p>
				<p class="text-dark/70 mb-2">Cercado, Arequipa, Perú</p>
			</div>
			<div>
				<h3 class="font-skia text-xl text-primary mb-4">Redes Sociales</h3>
				<div class="space-y-2">
					<a href="https://www.facebook.com/profile.php?id=61571843819365" target="_blank" rel="noopener" class="block text-primary hover:text-primary-light transition-colors">Facebook: Casona Texao</a>
					<a href="https://www.instagram.com/casona_texao" target="_blank" rel="noopener" class="block text-primary hover:text-primary-light transition-colors">Instagram: @casona_texao</a>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Volunteer -->
<section class="py-16 bg-primary text-white">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
			<svg class="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
		</div>
		<h2 class="font-skia text-3xl mb-4">Sé Voluntario</h2>
		<p class="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
			Forma parte de nuestro equipo de voluntarios y contribuye al desarrollo cultural de Arequipa.
			Buscamos personas apasionadas por el arte, la cultura y la comunidad que quieran ser parte del cambio.
		</p>
		<a
			href="https://wa.me/51920779580?text={encodeURIComponent('Hola, quiero ser voluntario/a en Casona Texao. Me gustaría saber más sobre cómo puedo participar.')}"
			target="_blank"
			rel="noopener"
			class="inline-flex items-center gap-2 bg-white text-primary hover:bg-cream font-semibold px-8 py-3 rounded-full transition-colors"
		>
			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
			Quiero ser voluntario
		</a>
	</div>
</section>

<!-- Map -->
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
	</div>
</section>
