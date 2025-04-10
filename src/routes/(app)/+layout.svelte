<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	let { children } = $props();
	import '../../app.css';
</script>

<div class="content grid h-full">
	<Sidebar />
	<main class="mx-[69px]">
		{@render children()}
	</main>
</div>

<style>
	@reference "../../app.css";

	.content {
		@apply relative pl-64 min-h-lvh;
	}
</style>
