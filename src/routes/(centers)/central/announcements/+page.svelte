<script lang="ts">
    import type { PageData } from './$types';
    import { enhance, applyAction } from '$app/forms';
    import Alert from '$lib/components/theme/shared/Alert.svelte';
    import FormError from '$lib/components/theme/shared/Form/Error.svelte';

    let { data, form } = $props();
    let announcements = $derived(data.announcements);
    let newAnnouncement = $state(form?.message || '');
</script>

<div class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div class="md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Announcements</h2>
        </div>
    </div>

    {#if form?.success}
        <Alert type="success">Announcement created successfully!</Alert>
    {/if}
    {#if form?.error}
        <Alert type="error">{form?.alert}</Alert>
    {/if}

    <div class="mt-8">
        <form
            method="POST"
            action="?/create"
            class="space-y-4"
            use:enhance={() => {
                return async ({ result }) => {
                    await applyAction(result);
                };
            }}
        >
            <div>
                <label for="message" class="block text-sm font-medium text-gray-700">New Announcement</label>
                <div class="mt-1">
                    <textarea
                        id="message"
                        name="message"
                        rows="3"
                        bind:value={newAnnouncement}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Write your announcement here..."
                    ></textarea>
                    <FormError errors={form?.errors} field="message" />
                </div>
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Post Announcement
                </button>
            </div>
        </form>
    </div>

    <div class="mt-8 space-y-6">
        {#each announcements as announcement}
            <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <div class="text-sm text-gray-500">
                        Posted by {announcement.user.name} on {new Date(announcement.createdAt).toLocaleDateString()}
                    </div>
                    <div class="mt-2 text-sm text-gray-900">
                        {announcement.message}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
