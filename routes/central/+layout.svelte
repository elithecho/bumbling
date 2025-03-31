<script lang="ts">
	import type { LayoutData } from './$types'; // Use LayoutData for type safety

	let { children }: LayoutData = $props(); // Destructure children directly
</script>

{@render children()}
