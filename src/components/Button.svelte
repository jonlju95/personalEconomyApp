<script lang="ts">
	export let formaction = '';

	let buttonProps = {
		type: $$restProps.type
	};
</script>

<button
	{formaction}
	class={$$props.class ?? ''}
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	{...buttonProps}
>
	<slot />
</button>

<style lang="scss">
	button {
		padding: 0.75rem 1.25rem;
		border-radius: 12px;

		cursor: pointer;

		font-family: var(--ff-sans);
		font-size: var(--fs-300);
		font-weight: var(--fw-500);

		box-shadow: var(--elevation2);

		&:hover {
			opacity: 0.92;
		}

		&.primaryBtn {
			border: none;
			background-color: var(--primary);
		}

		&.secondaryBtn {
			border: none;
			background-color: var(--secondary);
		}
	}
</style>
