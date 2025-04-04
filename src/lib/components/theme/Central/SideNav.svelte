<script lang="ts">
  import type { User } from '$lib/types';
  let { user }: { user: User } = $props();
</script>

<nav class="bg-white shadow-md h-screen px-4 py-6">
  <div class="mb-8">
    <img class="h-8 w-auto" src="/logo.svg" alt="Logo">
  </div>

  <span class="text-gray-900 text-lg font-bold">Hello, {user.name}!</span>

  <ul class="pt-12">
    <li>
      <a href="/central" class="block mt-4 text-gray-900 hover:text-gray-900">Dashboard</a>
    </li>
    <li>
      <a href="/central/classrooms" class="block mt-4 text-gray-900 hover:text-gray-900">Classrooms</a>
    </li>
    <li>
      <a href="/central/teachers" class="block mt-4 text-gray-900 hover:text-gray-900">Teachers</a>
    </li>
    <li>
      <a href="/central/children" class="block mt-4 text-gray-900 hover:text-gray-900">Children</a>
    </li>
    <li>
      <a href="/central/announcements" class="block mt-4 text-gray-900 hover:text-gray-900">Announcements</a>
    </li>
    <li>
      <a href="/central/incidents" class="block mt-4 text-gray-900 hover:text-gray-900">Incidents</a>
    </li>
    <li>
      <a href="/central/messages" class="block mt-4 text-gray-900 hover:text-gray-900">Messages</a>
    </li>
    <li>
      <a href="/central/settings" class="block mt-4 text-gray-900 hover:text-gray-900">Settings</a>
    </li>
  </ul>
</nav>
