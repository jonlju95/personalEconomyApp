<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Table from '$lib/components/Table.svelte';

	let headers = ['title', 'amount', 'date', 'recurring', 'category'];

	let { data } = $props();

	let rowId = $state('');

	const tableData = data.expenses;

	function handleClick() {
		if (rowId) {
			goto(`/expenses/${rowId}`);
		}
	}
</script>

<section class="py-12 flex flex-col h-full">
	<div class="flex justify-between items-baseline mb-8">
		<h4>Expenses</h4>
		<form class="h-fit">
			<Button formaction="/expenses/new" class="btn btn-primary" type="submit" on:click
				>Create new +</Button
			>
		</form>
	</div>
	<div class="h-fit rounded-xl">
		<Table {headers} {tableData} bind:rowId onclick={handleClick}></Table>
	</div>
</section>
