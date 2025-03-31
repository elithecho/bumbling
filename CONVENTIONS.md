**Guidelines:**

- Always use runes to make reactivity explicit.
- Keep logic clean and modular by using `$derived` and `$effect`.
- Only use `$bindable` when two-way binding is required.


# Bun as Node runtime

Instead of using npm, we are using Bun as the bundler and node runtime

instead of npm run, use bun run

**Svelte 5 Runes Convention**

This document outlines the usage conventions for Svelte 5 runes to keep code consistent and clear.

---

### `$state`

Use `$state` to define reactive variables.

```
let count = $state(0);
```

### `$derived`

Use `$derived` to create values based on other reactive state.

```
let doubled = $derived(count * 2);
```

### `$effect`

Use `$effect` for side effects that depend on reactive values.

```
$effect(() => {
  console.log(`Count: ${count}`);
});
```

### `$props`

Use `$props` to access and destructure component props.

```
let { name = 'World' } = $props();
```

### `$bindable`

Use `$bindable` to enable two-way binding with parent components.

```
let count = $bindable(0);
```

---

### Example: `useCounter.svelte.ts`

A reusable counter logic module using runes:

```ts
export function useCounter(initial = 0) {
  let count = $state(initial);
  let doubled = $derived(count * 2);

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  return { count, doubled, increment, decrement };
}
```

Then use it inside a component:

```
<script lang="ts">
  import { useCounter } from './useCounter.svelte';

  const { count, doubled, increment, decrement } = useCounter(5);
</script>

<button on:click={decrement}>-</button>
<button on:click={increment}>+</button>
<p>Count: {count}</p>
<p>Doubled: {doubled}</p>
```

# Sveltekit Server Convention
Getting data from the server in +page.svelte
```
<script>
  let { data } = $props();
  let center = $derived(data.center);
</script>
```
On the server side
```
export const load: PageServerLoad = async () => {
  const center = await prisma.center.findOne();

  return {
    center
  };
};
```

# Svelte Server

## page.server.ts
Page should export a load

import type { PageServerLoad } from '../$types';

```
export const load: PageServerLoad = async ({ params }) => {
  const center: Center | null = await prisma.center.findUnique({
    where: { id: params.id }
  });

  if (!center) {
    throw redirect(303, '/commandcenter/centers');
  }

  return {
    center,
  };
};
```

## Form Validation
Use this method to code svelte page forms

Use Zod to validate errors and zodErrorSchema converts ZodError into form format
```
import { z, ZodError } from "zod";
import zodErrorSchema from '$lib/utils/zodErrorSchema';

const centerSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(1),
})

try {
  centerUpdate = await centerSchema.parseAsync(centerData) ;
  const updatedCenter = await prisma.center.update({
    where: { id: params.id },
    data: centerUpdate,
  });

  return { success: true, center: updatedCenter };
} catch (err) {
  if (err instanceof ZodError) {
    const formattedErrors = zodErrorSchema(err);
    return fail(400, {
        error: true,
        alert: 'Please check the form for errors.',
        errors: formattedErrors,
        center: centerData,
    });
  }

  return fail(400, {
    error: true,
    alert: 'Something bad has happened',
    errors: {},
    center: centerData,
  });
}
```

in +page.svelte, use this convention for all forms with progressive enhancements with use:enhance

```
<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import type { Center } from '$lib/types';
  import Alert from '$lib/components/theme/shared/Alert.svelte';
  import FormError from '$lib/components/theme/shared/Form/Error.svelte';
  
  let { data, form } = $props();
  let center: Center = $state(form?.center || data.center) as Center;
</script>

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
  </form>
```

# Database

We are using Prisma, follow Prisma conventions which can be used in any +page.server.ts files

```
import prisma from '$lib/server/db';
```

Convention is to create a query 
