<script lang="ts">
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { superform, schema } = $props();
	const form = superForm(superform, {
		validators: zodClient(schema)
	});

	const { form: formData } = form;
</script>

		<form method="POST">
			<Field {form} name="name">
				<Control let:attrs>
					<Label>Nombre</Label>
					<input {...attrs} bind:value={$formData.name} required />
				</Control>
				<FieldErrors />
			</Field>

			<Field {form} name="picture">
				<Control let:attrs>
					<Label>Avatar</Label>
					<input {...attrs} bind:value={$formData.picture} required />
				</Control>
				<FieldErrors />
			</Field>

			<div><button>Submit</button></div>
		</form>

