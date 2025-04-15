<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

	let { label, items, selected = $bindable(), onclick }: { label: string; items: any[]; selected: string | undefined; onclick: MouseEventHandler<HTMLOptionElement> } = $props();
</script>

<div class="dropdownContainer">
	<label for="selectField" class="flex flex-col">
		{#if label}
			<span class="font-bold">{label}</span>
		{/if}
		<select name="selectField" id="selectField" bind:value={selected}>
			{#each items as item}
				<option class="cursor-pointer" value={item} {onclick}>{item.type}</option>
			{/each}
		</select>
	</label>
</div>

<style>
	@reference "../../app.css";

	.dropdownContainer {
		@apply relative mb-4;
		appearance: none;

		select {
			appearance: none;
			@apply p-3 mt-1 rounded-xl bg-surface-contrast-light border-1 border-surface-200 focus:border-primary-900 focus:border-1 cursor-pointer;
		}
	}

	.dropdownContainer::before,
	.dropdownContainer::after {
		--size: 0.3rem;
		position: absolute;
		content: '';
		right: 1rem;
		pointer-events: none;
	}

	.dropdownContainer::after {
		border-left: var(--size) solid transparent;
		border-right: var(--size) solid transparent;
		border-top: var(--size) solid oklch(63.18% 0.07 122.06deg);
		top: 65%;
	}
</style>
