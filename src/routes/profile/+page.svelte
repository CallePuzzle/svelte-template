<script lang="ts">
	import { Routes } from '$lib/routes';
	import { Control, Field, FieldErrors, Label } from "formsnap";
	import { superForm } from 'sveltekit-superforms';
	import { vine } from 'sveltekit-superforms/adapters';
	import {schema, defaults} from './schema';

	let { data } = $props();
	let form = superForm(data.form, {
		validators: vine(schema, { defaults })
	});

	let { form: formData, enhance } = form;
	console.log(formData);
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
		<form method="POST" use:enhance>

			<Field {form} name="name">
				<Control let:attrs>
				  <Label>Nombre</Label>
				  <input
					{...attrs}
					bind:value={$formData.name}
					minlength="2"
					maxlength="53"
					required
				  />
				</Control>
				<FieldErrors />
			  </Field>

			  <Field {form} name="picture">
				<Control let:attrs>
				  <Label>Avatar</Label>
				  <input
					{...attrs}
					bind:value={$formData.picture}
					minlength="2"
					maxlength="53"
					required
				  />
				</Control>
				<FieldErrors />
			  </Field>

			<div><button>Submit</button></div>
		</form>
	</div>
</div>
