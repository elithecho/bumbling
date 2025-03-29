<script lang="ts">
  import type { User } from '$lib/server/user/types';
  let { user }: { user: User } = $props();
</script>

<nav class="bg-white shadow-md h-screen">
  <div class="px-4 py-6">
    <div class="mb-8">
      <img class="h-8 w-auto" src="/logo.svg" alt="Logo">
    </div>

    <span class="ml-3 text-gray-900 text-lg font-medium">Hello, {user.name!}</span>
  </div>
</nav>
