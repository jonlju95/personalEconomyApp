<script lang="ts">
	import type { PageData } from './$types';
	import { afterNavigate, goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import DateInput from '$lib/components/DateInput.svelte';

	let { data }: { data: PageData } = $props();

	let { expense, categories } = $state(data);

	let touchedFields: (string | number | boolean)[] = $state([]);

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
			<h4>{expense.title}</h4>
		</div>
	</div>
	<div class="detailsContent">
		<div class="row">
			<div class="">
				<Input
					name="Title"
					inputId="Title"
					type="text"
					label="Title"
					bind:value={expense.title}
					onblur={() => touchedFields.push(expense.title)}
				/>
			</div>
			<div class="">
				<Input
					name="Description"
					inputId="Description"
					type="text"
					label="Description"
					bind:value={expense.description}
					onblur={() => touchedFields.push(expense.description)}
				/>
			</div>
		</div>
		<div class="row">
			<div class="">
				<DateInput name="Date" inputId="Date" label="Date" />
			</div>
			<div class="">
				<Input
					name="Amount"
					inputId="Amount"
					type="number"
					label="Amount"
					bind:value={expense.amount}
					onblur={() => touchedFields.push(expense.amount)}
				/>
			</div>
		</div>
		<div class="row">
			<div class="">
				<Dropdown
					label="Category"
					items={categories}
					bind:selected={expense.categoryId}
					onclick={() => touchedFields.push(expense.categoryId)}
				></Dropdown>
			</div>
			<div class="">
				<Toggle
					label="Recurring"
					bind:checked={expense.recurring}
					onclick={() => touchedFields.push(expense.recurring)}
				></Toggle>
			</div>
		</div>
	</div>
	<div class="detailsFooter">
		<Button label="Save" classList="btn btn-primary float-end" disabled={touchedFields.length === 0} onclick={() => {}}></Button>
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
		@apply flex flex-wrap h-[inherit] rounded-xl bg-surface-100 border-surface-200 shadow p-8 content-baseline;

		.row {
			@apply w-full flex h-fit mb-6;

			div {
				@apply me-8 w-[20%];
			}
		}
	}

	.detailsFooter {
		@apply rounded-xl bg-surface-100 border-surface-200 shadow p-4 mt-8;
	}
</style>
