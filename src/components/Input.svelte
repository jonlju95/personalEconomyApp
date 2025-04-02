<script lang="ts">
	export let name = '';
	export let inputId = '';
	export let type = 'text';
	export let value = type === 'text' ? '' : null;
	export let error = '';
	export let label = '';
	export let placeholder = '';
</script>

<div class="inputContainer">
	<label for={inputId}>
		{#if label}
			<span class="font-medium">{label}</span>
		{/if}
		<input
			class="bg-surface-contrast-light border-1 border-surface-200 focus:border-primary-900 focus:border-2"
			{name}
			id={inputId}
			class:error
			{type}
			{placeholder}
			bind:value
			on:blur
		/>
	</label>
</div>

<style lang="css">
	@reference "tailwindcss";

	.inputContainer {
		margin-bottom: 1rem;
		label {
			display: flex;
			flex-direction: column;
		}

		input {
			margin-top: 0.25rem;
			padding: 0.75rem;
			border-radius: 12px;

			&:focus {
				outline: none;
			}
		}
	}
</style>
