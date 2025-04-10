<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto, preloadData } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let previousPath = '';
	onMount(() => (previousPath = document.referrer));

	function goBack() {
		console.log(document);
		goto(previousPath);
	}
</script>

<section class="py-12 flex flex-col h-full">
	<div class="flex justify-between items-baseline mb-8 border-b border-primary-800">
		<button
			onclick={goBack}
			onfocus={async () => await preloadData(previousPath)}
			onmouseover={async () => await preloadData(previousPath)}>Back</button
		>
		<h3>{data.title}</h3>
	</div>
	<div class="h-[inherit] rounded-xl bg-surface-100 border-surface-200 shadow"></div>
</section>
