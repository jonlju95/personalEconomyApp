<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	let {
		type = 'button',
		label,
		classList,
		disabled = false,
		formaction,
		onclick
	}: {
		type?: 'button' | 'submit' | 'reset';
		label: string;
		classList?: string;
		disabled?: boolean;
		formaction?: string;
		onclick: MouseEventHandler<HTMLButtonElement>;
	} = $props();
</script>

<button class={classList} {type} {disabled} {formaction} {onclick}>{label}</button>

<style>
	@reference "../../app.css";

	.btn {
		@apply py-3 px-5 rounded-xl cursor-pointer transition-[0.2s];

		&:disabled {
			@apply bg-surface-200 text-surface-contrast-400 cursor-default;
		}

		&.btn-primary:enabled {
			@apply bg-primary-500 text-primary-contrast-500;

			&:hover:enabled {
				@apply brightness-75;
			}
		}

		&.btn-secondary {
			@apply border-2 border-secondary-500;

			&:hover {
				@apply bg-secondary-500;
			}
		}

		&.btn-tertiary {
			@apply bg-tertiary-300 text-tertiary-contrast-300;

			&:hover {
				@apply brightness-85;
			}
		}
	}
</style>
