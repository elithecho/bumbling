<script lang="ts">
  import { goto } from '$app/navigation';
  import { enhance, applyAction } from '$app/forms';
  import Alert from '$lib/components/theme/shared/Alert.svelte';
  import FormError from '$lib/components/theme/shared/Form/Error.svelte';

  let { form } = $props();
</script>

<div class="max-w-2xl mx-auto py-8 px-4">
  <h1 class="text-2xl font-bold mb-6">New Classroom</h1>

  {#if form?.error}
    <Alert type="error">{form?.alert}</Alert>
  {/if}

  <form
    method="POST"
    action="?/create"
    use:enhance={() => {
      return async ({ result }) => {
        if (result.type === 'redirect') {
          goto(result.location)
        } else {
          await applyAction(result);
        }
      };
    }}
    class="space-y-6"
  >
    <div>
      <label for="level" class="block text-sm font-medium text-gray-700">Level</label>
      <input
        type="text"
        name="level"
        id="level"
        value={form?.data?.level ?? ''}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <FormError errors={form?.errors} field="level" />
    </div>

    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={form?.data?.name ?? ''}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <FormError errors={form?.errors} field="name" />
    </div>

    <div class="flex justify-end gap-4">
      <a
        href="/central/classrooms"
        class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        Cancel
      </a>
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Create Classroom
      </button>
    </div>
  </form>
</div>
