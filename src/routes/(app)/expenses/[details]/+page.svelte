<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<section class="py-12 flex flex-col h-full">
	<div class="flex justify-between items-baseline mb-8 border-b border-primary-800">
		<h3>{data.title}</h3>
	</div>
	<div class="h-[inherit] rounded-xl bg-surface-100 border-surface-200 shadow">
	</div>
</section>