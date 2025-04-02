<script lang="ts">
  import type { CenterAdminWithUser } from "$lib/types";

  let { data } = $props();
  let center = $derived(data.center);
  let admins = $derived(data.admins) as CenterAdminWithUser[];
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Center: {center.name}</h1>
    <a
      href="/commandcenter/centers/{center.id}/admins/create"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
    >
      Add Admin
    </a>
  </div>

  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each admins as admin}
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.user.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.user.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.user.role}</td>
          </tr>
        {:else}
          <tr>
            <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">No admins found</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
