<script lang="ts">
  import type { Center } from '$lib/types';

  let { data } = $props();
  let centers: Center[] = $derived(data.centers);
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Centers</h1>

  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each centers as center}
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <a href="/commandcenter/centers/{center.id}">{center.name}</a>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{center.address}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
