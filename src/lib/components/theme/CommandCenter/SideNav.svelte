<script lang="ts">
  import type { User } from '$lib/server/user/types';
  let { user }: { user: User } = $props();
</script>

<nav class="bg-white shadow-md h-screen px-4 py-6">
  <div class="mb-8">
    <img class="h-8 w-auto" src="/logo.svg" alt="Logo">
  </div>

  <span class="text-gray-900 text-lg font-bold">Hello, {user.name}!</span>

  <ul class="pt-12">
    <li>
      <a href="/commandcenter" class="block mt-4 text-gray-900 hover:text-gray-900">Dashboard</a>
    </li>
    <li>
      <a href="/commandcenter/centers" class="block mt-4 text-gray-900 hover:text-gray-900">Centres</a>
    </li>
  </ul>
</nav>
