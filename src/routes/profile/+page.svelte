<script lang="ts">
	import { Routes } from '$lib/routes';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<div class="flex flex-col">
	<div class="hero">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">
					Hola {#if data.user.name}{data.user.name}{/if}
				</h1>
				<p class="py-6">
					Tienes {data.notificationsCount} notificaciones pendientes
					<a href={Routes.notification_my.url} class="btn">Ver notificaciones</a>
				</p>
			</div>
		</div>
	</div>
	<div class="container mx-auto px-4">
		{#if $message}<h3>{$message}</h3>{/if}
		<form method="POST" use:enhance>
			<label for="name">Name</label>
			<input
				type="text"
				name="name"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
			{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

			<label for="picture">E-mail</label>
			<input
				type="text"
				name="picture"
				aria-invalid={$errors.picture ? 'true' : undefined}
				bind:value={$form.picture}
				{...$constraints.picture}
			/>
			{#if $errors.picture}<span class="invalid">{$errors.picture}</span>{/if}

			<div><button>Submit</button></div>
		</form>
	</div>
</div>
