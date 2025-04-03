<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props()
</script>

<h1 class="fort-bold text-2xl">{data.center.name}</h1>
