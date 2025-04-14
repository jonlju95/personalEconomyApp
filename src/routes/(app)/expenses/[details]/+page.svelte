<script lang="ts">
	import type { PageData } from './$types';
	import { afterNavigate, goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	let { data }: { data: PageData } = $props();

	// For now previousPath will be partially hard coded. If one will be able to access a detail from someplace else later on, then change this
	let previousPath = '/expenses';

	afterNavigate(({ from }) => {
		previousPath = !from?.url.pathname ? '/expenses' : from?.url.pathname;
	});

	function goBack() {
		goto(previousPath);
	}
</script>

<section class="detailsSection">
	<div class="detailsMenu">
		<div class="flex">
			<button class="mr-4 cursor-pointer" type="button" onclick={goBack}><h4>{'<'}</h4></button>
			<h4>{data.expense.title}</h4>
		</div>
	</div>
	<div class="detailsContent">
		<div class="w-[20%]">
			<Input name="Title" inputId="Title" type="text" label="Title" bind:value={data.expense.title} />
		</div>
		<div class="w-[20%]">
			<Input name="Description" inputId="Description" type="text" label="Description" bind:value={data.expense.description} />
		</div>
		<div class="w-[20%]">
			<Input name="Date" inputId="Date" type="text" label="Date" />
		</div>
		<div class="w-[20%]">
			<Input name="Amount" inputId="Amount" type="text" label="Amount"/>
		</div>
		<div class="w-[20%]">
		</div>
	</div>
	<div class="detailsFooter">
		<Button class="btn btn-primary float-end">Save</Button>
	</div>
</section>

<style>
	@reference "../../../../app.css";

	.detailsSection {
		@apply py-12 flex flex-col h-full;
	}

	.detailsMenu {
		@apply flex justify-between items-baseline mb-8 border-b border-primary-800;
	}

	.detailsContent {
		@apply h-[inherit] rounded-xl bg-surface-100 border-surface-200 shadow p-8;
	}

	.detailsFooter {
		@apply rounded-xl bg-surface-100 border-surface-200 shadow p-4 mt-8;
	}
</style>
