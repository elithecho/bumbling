<script lang="ts">
  let { data } = $props();
  let center = $derived(data.center);
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Center: {center.name}</h1>
</div>
