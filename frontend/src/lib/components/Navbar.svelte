<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let mobileOpen = $state(false);
	let searchOpen = $state(false);
	let searchQuery = $state('');
	let searchInput: HTMLInputElement | undefined = $state();

	const links = [
		{ href: '/', label: 'Inicio' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/nosotros', label: 'Nosotros' },
		{ href: '/contacto', label: 'Contacto' },
	];

	function closeMobile() {
		mobileOpen = false;
	}

	function toggleSearch() {
		searchOpen = !searchOpen;
		if (searchOpen) {
			setTimeout(() => searchInput?.focus(), 100);
		}
	}

	function handleSearch(e: Event) {
		e.preventDefault();
		if (searchQuery.trim()) {
			goto(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
			searchOpen = false;
			searchQuery = '';
			closeMobile();
		}
	}
</script>

<nav class="bg-cream/95 backdrop-blur-sm text-dark sticky top-0 z-50 shadow-sm">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="flex items-center gap-3" onclick={closeMobile}>
				<img src="/images/logo-texao-horizontal.png" alt="Casona Texao" class="h-10" />
			</a>

			<!-- Desktop nav -->
			<div class="hidden md:flex items-center gap-6">
				{#each links as link}
					<a
						href={link.href}
						class="text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary {page.url.pathname === link.href || (link.href !== '/' && page.url.pathname.startsWith(link.href)) ? 'text-primary' : 'text-dark/70'}"
					>
						{link.label}
					</a>
				{/each}
				<button
					onclick={toggleSearch}
					class="p-2 text-dark/60 hover:text-primary transition-colors"
					aria-label="Buscar"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				</button>
				<a
					href="https://wa.me/51920779580"
					target="_blank"
					rel="noopener"
					class="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
				>
					Reservar
				</a>
			</div>

			<!-- Mobile buttons -->
			<div class="flex items-center gap-2 md:hidden">
				<button
					onclick={toggleSearch}
					class="p-2 text-dark/60 hover:text-primary transition-colors"
					aria-label="Buscar"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				</button>
				<button
					class="p-2"
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
	</div>

	<!-- Search bar -->
	{#if searchOpen}
		<div class="border-t border-dark/10 bg-white">
			<form onsubmit={handleSearch} class="max-w-3xl mx-auto px-4 py-3 flex gap-3">
				<div class="flex-1 relative">
					<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
					<input
						bind:this={searchInput}
						bind:value={searchQuery}
						type="text"
						placeholder="Buscar artículos, eventos, categorías..."
						class="w-full pl-10 pr-4 py-2.5 bg-cream rounded-full text-sm text-dark placeholder-dark/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
					/>
				</div>
				<button
					type="submit"
					class="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
				>
					Buscar
				</button>
				<button
					type="button"
					onclick={() => searchOpen = false}
					class="p-2.5 text-dark/40 hover:text-dark transition-colors"
					aria-label="Cerrar búsqueda"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</form>
		</div>
	{/if}

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="md:hidden bg-cream border-t border-dark/10">
			<div class="px-4 py-4 space-y-3">
				{#each links as link}
					<a
						href={link.href}
						class="block py-2 text-sm font-medium uppercase tracking-wide {page.url.pathname === link.href ? 'text-primary' : 'text-dark/70'}"
						onclick={closeMobile}
					>
						{link.label}
					</a>
				{/each}
				<a
					href="https://wa.me/51920779580"
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
