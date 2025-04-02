<script lang="ts">
  let { data } = $props();
  let center = $derived(data.center);
  let admins = $derived(data.admins);
  let childrenCount = 42;
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-6">{center.name}</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-gray-500 text-sm uppercase">Total Admins</h2>
      <p class="text-3xl font-bold">{admins.total}</p>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-gray-500 text-sm uppercase">Total Children</h2>
      <p class="text-3xl font-bold">{childrenCount}</p>
    </div>
  </div>

  <div class="flex justify-end mb-6">
    <a
      href="/commandcenter/centers/{center.id}/admins/create"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
    >
      Add Admin
    </a>
  </div>
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto">
      <thead>
        <tr class="bg-gray-50">
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each admins?.items ?? [] as admin}
          <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.user.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.user.email}</td>
          </tr>
        {:else}
          <tr>
            <td colspan="3" class="px-6 py-8 text-center text-gray-500">No admins found</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
