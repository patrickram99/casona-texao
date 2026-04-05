<script lang="ts">
	import { page } from '$app/state';

	let mobileOpen = $state(false);

	const links = [
		{ href: '/', label: 'Inicio' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/nosotros', label: 'Nosotros' },
		{ href: '/contacto', label: 'Contacto' },
	];

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<nav class="bg-dark/95 backdrop-blur-sm text-white sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="flex items-center gap-3" onclick={closeMobile}>
				<img src="/images/logo-texao-horizontal.png" alt="Casona Texao" class="h-10" />
			</a>

			<!-- Desktop nav -->
			<div class="hidden md:flex items-center gap-8">
				{#each links as link}
					<a
						href={link.href}
						class="text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent {page.url.pathname === link.href || (link.href !== '/' && page.url.pathname.startsWith(link.href)) ? 'text-accent' : 'text-white/80'}"
					>
						{link.label}
					</a>
				{/each}
				<a
					href="https://wa.me/51999999999"
					target="_blank"
					rel="noopener"
					class="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
				>
					Reservar
				</a>
			</div>

			<!-- Mobile hamburger -->
			<button
				class="md:hidden p-2"
				onclick={() => mobileOpen = !mobileOpen}
				aria-label="Menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="md:hidden bg-dark border-t border-white/10">
			<div class="px-4 py-4 space-y-3">
				{#each links as link}
					<a
						href={link.href}
						class="block py-2 text-sm font-medium uppercase tracking-wide {page.url.pathname === link.href ? 'text-accent' : 'text-white/80'}"
						onclick={closeMobile}
					>
						{link.label}
					</a>
				{/each}
				<a
					href="https://wa.me/51999999999"
					target="_blank"
					rel="noopener"
					class="block bg-primary text-white text-center px-4 py-2 rounded-full text-sm font-semibold mt-4"
					onclick={closeMobile}
				>
					Reservar por WhatsApp
				</a>
			</div>
		</div>
	{/if}
</nav>
