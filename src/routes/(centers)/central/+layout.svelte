<script lang="ts">
	import type { LayoutProps } from './$types';
	import SideNav from '$lib/components/theme/Central/SideNav.svelte';

	// Props including data from the load function and children (page content)
	let { data, children }: LayoutProps = $props();
</script>

<main class="grid grid-cols-6 min-h-screen">
	<div class="col-span-1">
		<!-- Side navigation receives user data -->
		<SideNav user={data.user} />
	</div>
	<div class="col-span-5 px-12 py-8">
		<!-- Renders the page content (the default slot) -->
		{@render children()}
	</div>
</main>
