<script lang="ts">
  import type { Classroom } from '$lib/types';
  import { enhance } from '$app/forms';

  let { data } = $props();
  let classrooms = $state(data.classrooms as Classroom[]);
</script>

<div class="px-4 py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Manage Classrooms</h1>
    <a
      href="/central/classrooms/new"
      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Add Classroom
    </a>
  </div>

  {#if classrooms.length === 0}
    <p class="text-gray-500 text-center py-8">No classrooms found. Create your first classroom to get started.</p>
  {:else}
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each classrooms as classroom}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{classroom.level}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{classroom.name}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(classroom.createdAt).toLocaleDateString()}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <a href="/central/classrooms/{classroom.id}" class="text-indigo-600 hover:text-indigo-900">View</a>
                <form
                  method="POST"
                  action="?/delete"
                  class="inline"
                  use:enhance={() => {
                    return async ({ result }) => {
                        console.log(result);
                      if (result.type === 'success') {
                        classrooms = classrooms.filter(c => c.id !== classroom.id);
                      }
                    };
                  }}
                >
                  <input type="hidden" name="id" value={classroom.id} />
                  <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                </form>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
