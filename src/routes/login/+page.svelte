<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  export let form: ActionData;

  let loading = false;
</script>

<div class="min-h-screen flex items-center justify-center bg-[#FFF8F3] py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 p-12 bg-white rounded-2xl shadow-2xl">
    <div class="text-center">
      <img src="/logo.svg" alt="Mangools" class="h-8 mx-auto mb-6" />
      <h2 class="text-[42px] font-bold text-[#2D3748] mb-2">Good to see you again</h2>
    </div>
    <form method="POST" use:enhance={() => {
      loading = true;
      return async ({ update }) => {
        loading = false;
        await update();
      };
    }} class="mt-8 space-y-6">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Your email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-lg pl-11 block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 text-base transition-colors duration-200"
              placeholder="user@mail.com"
            />
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Your password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-lg pl-11 block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 text-base transition-colors duration-200"
              placeholder="********"
            />
          </div>
        </div>
      </div>

      {#if form?.error}
        <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{form.error}</div>
      {/if}

      <div class="flex items-center justify-between text-sm">
        <a href="/signup" class="font-medium text-blue-600 hover:text-blue-500">Don't have an account?</a>
        <a href="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          class="group relative w-full flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-lg text-white bg-[#00B67A] hover:bg-[#00A067] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors duration-200"
        >
          {#if loading}
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            Processing...
          {:else}
            Sign in
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
