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

---

**Guidelines:**

- Always use runes to make reactivity explicit.
- Keep logic clean and modular by using `$derived` and `$effect`.
- Only use `$bindable` when two-way binding is required.

# Database

We are using Prisma, follow Prisma conventions
