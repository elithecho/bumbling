<script lang="ts">
	import type { LayoutProps } from './$types';

	// Props including data from the load function and children (page content)
	let { data, children }: LayoutProps = $props();
</script>

<main class="grid grid-cols-5 min-h-screen">
	<div class="col-span-1">
	</div>
	<div class="col-span-4 px-12 py-8">
		<!-- Renders the page content (the default slot) -->
		{@render children()}
	</div>
</main>
