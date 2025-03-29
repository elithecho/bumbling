<script lang="ts">
  import type { User } from '$lib/server/user/types';
  let { user }: { user: User } = $props();
</script>

<nav class="bg-white shadow-md h-screen w-64">
  <div class="flex flex-col h-full">
    <div class="px-4 py-6 flex items-center">
      <div class="flex-shrink-0">
        <img class="h-8 w-auto" src="/logo.svg" alt="Logo">
      </div>
      <span class="ml-3 text-gray-900 text-sm font-medium">{user.name}</span>
    </div>
    <!-- Sidebar content placeholder -->
    <div class="flex-1">
      <!-- Additional menu items can go here -->
    </div>
  </div>
</nav>
