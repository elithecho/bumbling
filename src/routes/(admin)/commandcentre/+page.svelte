<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Command Centre</h1>
  <p>Welcome, {data.user.name}! You are {data.user.role}</p>
</div>
