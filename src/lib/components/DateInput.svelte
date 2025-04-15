<script lang="ts">
	export let name = '';
	export let inputId = '';
	export let value = '';
	export let label = '';
</script>

<div class="inputContainer">
	<label for={inputId}>
		{#if label}
			<span class="font-bold">{label}</span>
		{/if}
		<input
			type="date"
			class="inputField"
			{name}
			id={inputId}
			bind:value
			placeholder="dd-mm-yyyy"
			on:blur
		/>
	</label>
</div>

<style lang="css">
	@reference "../../app.css";

	.inputContainer {
		margin-bottom: 1rem;
		label {
			display: flex;
			flex-direction: column;
		}

		.inputField {
			@apply bg-surface-contrast-light border-1 border-surface-200 focus:border-primary-900 focus:border-1;
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
