<script lang="ts">
	let { visible = false }: { visible?: boolean } = $props();

	const partners = [
		{ name: 'Ministerio de Cultura', initials: 'MC' },
		{ name: 'Municipalidad de Arequipa', initials: 'MA' },
		{ name: 'Alliance Française', initials: 'AF' },
		{ name: 'Universidad Nacional de San Agustín', initials: 'UNSA' },
		{ name: 'Gobierno Regional de Arequipa', initials: 'GRA' },
		{ name: 'Centro Cultural Peruano Norteamericano', initials: 'CCPN' },
		{ name: 'Asociación Cultural Teatral', initials: 'ACT' },
		{ name: 'Red de Puntos de Cultura', initials: 'RPC' },
	];
</script>

{#if visible}
<section class="py-16 bg-white overflow-hidden">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="font-skia text-3xl text-center text-primary mb-3">Nuestros Aliados</h2>
		<p class="text-center text-dark/50 text-sm mb-10">Organizaciones que han colaborado con nosotros</p>

		<!-- Infinite scroll marquee -->
		<div class="relative">
			<div class="flex animate-marquee gap-12 items-center">
				{#each [...partners, ...partners] as partner}
					<div class="shrink-0 w-36 h-24 bg-cream rounded-xl flex flex-col items-center justify-center px-3 hover:bg-primary/5 transition-colors" title={partner.name}>
						<span class="font-skia text-xl text-primary/60 mb-1">{partner.initials}</span>
						<span class="text-[10px] text-dark/40 text-center leading-tight">{partner.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
{/if}

<style>
	@keyframes marquee {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}
	.animate-marquee {
		animation: marquee 30s linear infinite;
	}
	.animate-marquee:hover {
		animation-play-state: paused;
	}
</style>
