<script>
	let { children } = $props();
	import '../app.css';
</script>

<main class="h-full grid grid-cols-12 gap-4 mx-[138px]">
	{@render children()}
</main>
