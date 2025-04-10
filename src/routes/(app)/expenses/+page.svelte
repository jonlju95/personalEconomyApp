<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Table from '$lib/components/Table.svelte';

	let headers = ['Amount', 'Date', 'Recurring', 'Category'];
	let data = [
		{
			id: 'id1',
			amount: 'Amount',
			data: 'Date',
			recurring: 'Recurring',
			category: 'Category'
		},
		{
			id: 'id2',
			amount: 'Amount',
			data: 'Date',
			recurring: 'Recurring',
			category: 'Category'
		}
	];

	let rowId = $state();

	function handleClick() {
		if (rowId) {
            goto(`/expenses/${rowId}`)
		}
	}
</script>

<section class="py-12 flex flex-col h-full">
	<div class="flex justify-between items-baseline mb-8">
		<h3>Expenses</h3>
		<form class="h-fit">
			<Button formaction="/expenses/new" class="btn btn-primary" type="submit" on:click
				>Create new +</Button
			>
		</form>
	</div>
	<div class="h-fit rounded-xl">
		<Table {headers} {data} bind:rowId onclick={handleClick}></Table>
	</div>
</section>
