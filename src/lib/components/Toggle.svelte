<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

	let { label, checked = $bindable(), onclick }: { label: string; checked: boolean; onclick: MouseEventHandler<HTMLInputElement> } = $props();
</script>

<div class="flex flex-col">
	<span class="font-bold">{label}</span>
	<label class="switch">
		<input type="checkbox" bind:checked {onclick}/>
		<div class="slider round"></div>
	</label>
</div>

<style>
	@reference '../../app.css';

	/* The switch - the box around the slider */
	.switch {
		@apply relative inline-block w-[60px] h-[34px] mt-[4px];
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		@apply absolute cursor-pointer inset-0 bg-surface-300;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		@apply absolute h-[26px] w-[26px] left-[4px] bottom-[4px] bg-surface-50;
		content: '';
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		@apply bg-primary-500;
	}

	input:focus + .slider {
		@apply shadow-primary-500;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
