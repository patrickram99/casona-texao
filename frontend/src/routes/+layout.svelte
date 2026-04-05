<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Casona Texao - Centro Cultural</title>
	<meta name="description" content="Centro Cultural Casona Texao - Donde convergen el arte, la cultura y la música en Arequipa, Perú." />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
