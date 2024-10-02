<script lang="ts">
	import { t } from '$lib/translations';
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let {
		superform,
		schema
	}: {
		superform: any;
		schema: any;
	} = $props();
	const form = superForm(superform, {
		validators: zodClient(schema)
	});

	const { form: formData } = form;
	const fields = schema.keyof().options;
	const schemaObj = schema.shape;
</script>

<form method="POST">
	{#each fields as field}
		<Field {form} name={field}>
			<Control let:attrs>
				<Label>{$t('user.' + field)}</Label>
				<input
					{...attrs}
					bind:value={$formData[field]}
					required={!schemaObj[field].isOptional()}
					minlength={schemaObj[field].minLength}
					maxlength={schemaObj[field].maxLength}
				/>
			</Control>
			<FieldErrors />
		</Field>
	{/each}

	<div><button>Submit</button></div>
</form>
