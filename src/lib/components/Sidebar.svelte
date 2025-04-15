<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Button from './Button.svelte';
</script>

<nav class="fixed w-3xs h-full left-0 bg-primary-500 text-primary text-center pt-8">
	<h4 class="italic">Logo</h4>
	<ul class="mt-8">
		<li class="text-left">
			<a
				class="p-4 pl-8 flex hover:backdrop-brightness-75 transition-[0.2s]"
				class:backdrop-brightness-75={page.url.pathname.includes('/overview')}
				href="/overview">Home</a
			>
		</li>
		<li class="text-left">
			<a
				class="p-4 pl-8 flex hover:backdrop-brightness-75 transition-[0.2s]"
				class:backdrop-brightness-75={page.url.pathname.includes('/expenses')}
				href="/expenses">Expenses</a
			>
		</li>
		<li class="text-left">
			<a
				class="p-4 pl-8 flex hover:backdrop-brightness-75 transition-[0.2s]"
				class:backdrop-brightness-75={page.url.pathname.includes('/budget')}
				href="/budget">Budget</a
			>
		</li>
		<li class="text-left">
			<a
				class="p-4 pl-8 flex hover:backdrop-brightness-75 transition-[0.2s]"
				class:backdrop-brightness-75={page.url.pathname.includes('/settings')}
				href="/settings">Settings</a
			>
		</li>
	</ul>
	<div class="absolute bottom-2 w-full">
		<form method="POST" use:enhance>
			<Button
				class="btn btn-tertiary bg-tertiary-500 text-tertiary-contrast-50"
				type="submit"
				formaction="?/logout"
				on:click>Logout</Button
			>
		</form>
	</div>
</nav>

<style>
	nav {
		grid-area: 'sidebar';
	}
</style>
