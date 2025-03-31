<script>
  let { errors, field } = $props();
</script>

{#if errors && errors[field]}
  <p class="text-red-700 text-sm mt-1">{errors[field]}</p>
{/if}
