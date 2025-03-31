<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import type { Center } from '$lib/types';  // Add back the type import
  import Alert from '$lib/components/theme/shared/Alert.svelte';
  import FormError from '$lib/components/theme/shared/Form/Error.svelte';
  
  let { data, form } = $props();
  let center: Center = $state(form?.center || data.center) as Center;
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Edit {center.name}</h1>

  {#if form?.success}
    <Alert type="success">Succssfully updated {form?.center?.name}</Alert>
  {/if}
  {#if form?.error}
    <Alert type="error">{form?.alert}</Alert>
  {/if}

  <form
    method="POST"
    action="?/update"
    use:enhance={() => {
      return async ({ result }) => {
        await applyAction(result);
      };
    }}
  >
    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={center.name}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <FormError errors={form?.errors} field="name" />
      </div>
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={center.address}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <FormError errors={form?.errors} field="address" />
      </div>
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</div>
