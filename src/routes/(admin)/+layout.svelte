<script lang="ts">
	import type { LayoutProps } from './$types';
  import Navbar from '$lib/components/CommandCentre/Navbar.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<main class="grid grid-cols-12 min-h-screen">
	<div class="col-span-2">
		<Navbar user={data.user} />
	</div>
	<div class="col-span-10">
		{@render children()}
	</div>
</main>
