<script lang="ts">
	import type { LayoutProps } from './$types';
  import SideNav from '$lib/components/theme/CommandCenter/SideNav.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<main class="grid grid-cols-5 min-h-screen">
	<div class="col-span-1">
		<SideNav user={data.user} />
	</div>
	<div class="col-span-4 px-12 py-8">
		{@render children()}
	</div>
</main>
