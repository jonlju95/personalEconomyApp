<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '../../components/Button.svelte';
	import Input from '../../components/Input.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let username = $state('');
	let password = $state('');

	let touchedUsername = false;
	let touchedPassword = false;

	let touchedFields = { touchedUsername, touchedPassword };
</script>

<section class="loginSection bg-surface-100">
	<h4 class="font-serif mb-4">Login</h4>
	<form method="POST" use:enhance>
		<Input
			name="username"
			inputId="username"
			type="text"
			label="Username"
			bind:value={username}
			on:blur={() => (touchedFields.touchedUsername = true)}
		/>
		<Input
			name="password"
			inputId="password"
			type="password"
			label="Password"
			bind:value={password}
			on:blur={() => (touchedFields.touchedPassword = true)}
		/>
		<div class="buttonContainer">
			<div>
				<Button
					type="submit"
					formaction="?/register"
					class="secondaryBtn border border-solid border-secondary-500"
					on:click>Register</Button
				>
			</div>
			<div>
				<Button
					type="submit"
					formaction="?/login"
					class="primaryBtn bg-primary-500 text-primary-contrast-500"
					on:click>Login</Button
				>
			</div>
		</div>
	</form>
	{#if form?.message ?? ''}
		<div class="errorMessageContainer">
			<p>{form?.message ?? ''}</p>
		</div>
	{/if}
</section>

<style lang="css">
	@reference "tailwindcss";

	.loginSection {
		position: relative;
		width: 22vw;
		padding: 1rem 3rem 5rem;
		margin-top: 8rem;
		border-radius: 12px;
		box-shadow: var(--elevation1);

		display: flex;
		flex-direction: column;
	}

	.buttonContainer {
		display: flex;
		justify-content: end;

		:last-child {
			margin-left: 1rem;
		}
	}

	.errorMessageContainer {
		background-color: var(--error);
		border-radius: 12px;
		padding: 0 0.5rem;
		margin-top: 2rem;
		max-width: 100%;

		color: #93000a;
	}
</style>
