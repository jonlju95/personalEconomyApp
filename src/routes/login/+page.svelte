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

<section class="loginSection">
	<h2>Personal economy</h2>
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
				<Button type="submit" formaction="?/register" class="primaryBtn" on:click>Register</Button>
			</div>
			<div>
				<Button type="submit" formaction="?/login" class="primaryBtn" on:click>Login</Button>
			</div>
		</div>
	</form>
	{#if form?.message ?? ''}
		<div class="errorMessageContainer">
			<p>{form?.message ?? ''}</p>
		</div>
	{/if}
</section>

<style lang="scss">
	.loginSection {
		position: relative;
		width: 22vw;
		padding: 1rem 3rem 5rem;
		margin-top: 8rem;
		border-radius: 12px;
		box-shadow: var(--elevation1);
		background-color: var(--background);
		border: 1px solid var(--border);

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
