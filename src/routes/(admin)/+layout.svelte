<script lang="ts">
	import type { LayoutProps } from './$types';
  import SideNav from '$lib/components/theme/CommandCenter/SideNav.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<main class="grid grid-cols-5 gap-8 min-h-screen">
	<div class="col-span-1">
		<SideNav user={data.user} />
	</div>
	<div class="col-span-4">
		{@render children()}
	</div>
</main>
