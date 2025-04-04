<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import Alert from '$lib/components/theme/shared/Alert.svelte';
  import FormError from '$lib/components/theme/shared/Form/Error.svelte';

  let { data, form } = $props();

  let password = $state('');
  let confirmPassword = $state('')
  let passwordError = $state('');
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-6">Add Admin to Center</h1>

  {#if form?.success}
    <Alert type="success">Successfully added admin</Alert>
  {/if}
  {#if form?.error}
    <Alert type="error">{form?.alert}</Alert>
  {/if}

  <form
    method="POST"
    action="?/create"
    use:enhance={() => {
      return async ({ result }) => {
        await applyAction(result);
      };
    }}
    class="max-w-lg"
  >
    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <FormError errors={form?.errors} field="name" />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <FormError errors={form?.errors} field="email" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          bind:value={password}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <FormError errors={form?.errors} field="password" />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          bind:value={confirmPassword}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {#if passwordError}
          <p class="mt-1 text-sm text-red-600">{passwordError}</p>
        {/if}
      </div>

      <div class="pt-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Admin
        </button>
      </div>
    </div>
  </form>
</div>
