<script lang="ts">
	import type { LayoutProps } from './$types';
  import Navbar from '$lib/components/CommandCentre/Navbar.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<main>
	<Navbar user={data.user} />
	<!-- +page.svelte is `@render`ed here -->
	{@render children()}
</main>
