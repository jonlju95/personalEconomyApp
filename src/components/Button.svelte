<script lang="ts">
	export let formaction = '';

	let buttonProps = {
		type: $$restProps.type
	};
</script>

<button {formaction} class="{$$props.class ?? ''}" on:click on:mouseover on:mouseenter on:mouseleave {...buttonProps}>
	<slot />
</button>

<style lang="scss">
	button {
		padding: 0.75rem 1.25rem;
		border-radius: 12px;
		
		cursor: pointer;
		font-family: 'Cabin';
		font-weight: 700;
		font-size: medium;

		&:hover {
			background: #c5cab9;
		}

        &.primaryBtn {
            border: none;
            background: var(--primary);
        }

        &.secondaryBtn {
            border: none;
            background: var(--secondary);
        }
	}
</style>
