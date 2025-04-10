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
	@reference "../../app.css";

	.btn {
		@apply py-3 px-5 rounded-xl cursor-pointer transition-[0.2s];

		&.btn-primary {
			@apply bg-primary-500 text-primary-contrast-500;

			&:hover {
				@apply brightness-75;
			}
		}

		&.btn-secondary {
			@apply border-2 border-secondary-500;

			&:hover {
				@apply bg-secondary-500;
			}
		}
	}
</style>
