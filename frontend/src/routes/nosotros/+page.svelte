<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
</script>

<svelte:head>
	<title>Nosotros - Casona Texao</title>
	<meta name="description" content="Conoce la historia y misión del Centro Cultural Casona Texao en Arequipa, Perú." />
</svelte:head>

<HeroSection
	title="Nosotros"
	subtitle="Conoce nuestra historia y misión"
/>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
	<div class="prose max-w-none bg-white rounded-xl p-8 md:p-12 shadow-sm">
		<h2>Nuestra Historia</h2>
		<p>
			La Casona Texao es un espacio cultural ubicado en el corazón del Centro Histórico de Arequipa,
			en la emblemática Calle Puente Grau 108. Reconocida como Punto de Cultura por el Ministerio de
			Cultura del Perú, nuestra misión es democratizar el acceso al arte y la cultura.
		</p>
		<p>
			Desde nuestra fundación, hemos trabajado para crear un espacio donde artistas, gestores culturales
			y la comunidad arequipeña puedan converger para crear, aprender y transformar. Nuestra casona colonial
			alberga teatro, música, charlas, talleres y festivales que celebran la riqueza cultural de Arequipa y del Perú.
		</p>

		<h2>Misión</h2>
		<p>
			Promover el desarrollo cultural y artístico de Arequipa a través de charlas, teatro, música,
			festivales y eventos que celebren nuestra identidad y patrimonio, haciendo de la cultura un
			derecho accesible para todos.
		</p>

		<h2>Visión</h2>
		<p>
			Ser el centro cultural de referencia en el sur del Perú, donde artistas, gestores culturales
			y la comunidad converjan para crear, aprender y transformar la realidad a través del arte.
		</p>

		<h2>Valores</h2>
		<ul>
			<li><strong>Inclusión:</strong> La cultura es para todos, sin distinción.</li>
			<li><strong>Creatividad:</strong> Fomentamos la expresión artística en todas sus formas.</li>
			<li><strong>Compromiso comunitario:</strong> Trabajamos por y para nuestra comunidad.</li>
			<li><strong>Respeto por el patrimonio:</strong> Valoramos y preservamos nuestra herencia cultural.</li>
			<li><strong>Pasión por las artes:</strong> El arte es el motor de nuestra transformación social.</li>
		</ul>

		<h2>Punto de Cultura</h2>
		<p>
			La Casona Texao es uno de los Puntos de Cultura reconocidos por el Ministerio de Cultura del Perú
			bajo la Ley N° 30487. Este reconocimiento avala nuestro compromiso con el desarrollo cultural
			comunitario y nos integra a una red nacional de organizaciones que utilizan la creatividad como
			herramienta de cambio social.
		</p>
	</div>
</div>

<!-- Map -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="font-skia text-3xl text-center text-primary mb-8">Nuestra Ubicación</h2>
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
	</div>
</section>
