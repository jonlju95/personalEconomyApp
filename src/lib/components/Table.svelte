<script lang="ts">
	let {
		onclick,
		headers,
		tableData,
		rowId = $bindable()
	}: { onclick: any; headers: string[]; tableData: any[]; rowId: string } = $props();

	function rowClick(row: any) {
		
	}
</script>

<table class="w-full">
	<thead>
		<tr>
			<th class="w-[3%]"></th>
			{#each Object.keys(tableData[0]) as header}
				{#if headers.indexOf(header) > -1}
					<th class="text-start">{header.charAt(0).toUpperCase() + header.slice(1)}</th>
				{/if}
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Object.values(tableData) as row}
			<tr>
				<td class="text-center"><input type="checkbox" class="cursor-pointer" /></td>
				{#each Object.entries(row) as [key, value]}
					{#if headers.indexOf(key) > -1}
						<td class="cursor-pointer" onclick={() => onclick((rowId = row['id']))}>{value}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	@reference "../../app.css";

	thead > tr {
		@apply bg-primary-contrast-50 text-primary-contrast-950 rounded-xl;
	}

	tbody {
		@apply [&>*:nth-child(even)]:bg-surface-100 [&>*:nth-child(odd)]:bg-surface-50;

		tr {
			@apply hover:brightness-80 transition-[0.2s];
		}
	}

	th,
	td {
		padding: 0.75rem;
	}
</style>
