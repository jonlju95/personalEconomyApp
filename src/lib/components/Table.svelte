<script lang="ts">
	let { onclick, headers, data, rowId = $bindable() } = $props();
</script>

<table class="w-full">
	<thead>
		<tr class="bg-primary-contrast-50 text-primary-contrast-950 rounded-xl">
			<th class="w-[3%]"></th>
			{#each headers as header}
				<th class="text-start">{header}</th>
			{/each}
		</tr>
	</thead>
	<tbody class="[&>*:nth-child(even)]:bg-surface-100 [&>*:nth-child(odd)]:bg-surface-50">
		{#each data as row}
			<tr class=" hover:brightness-80 transition-[0.2s]">
				<td class="text-center"><input type="checkbox" class="cursor-pointer"/></td>
				{#each Object.entries(row) as [key, value]}
					{#if key != 'id'}
						<td class="cursor-pointer" onclick={() => onclick((rowId = row['id']))}>{value}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th,
	td {
		padding: 0.75rem;
	}
</style>
