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

<style lang="css">
	@reference "tailwindcss";

	button {
		padding: 0.75rem 1.25rem;
		border-radius: 12px;

		cursor: pointer;

		&.primaryBtn {
			&:hover {
				filter: brightness(75%);
			}
		}

		&.secondaryBtn {
			&:hover {
				background-color: var(--color-secondary-500);
			}
		}
	}
</style>
