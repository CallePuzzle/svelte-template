<script lang="ts">
	import { goto } from '$app/navigation';
	import { Routes } from '$lib/routes';
	import { UserSchema } from '$lib/schemas';
	import Form from '$lib/components/forms/Form.svelte';
	import { t } from '$lib/translations';

	import type { PageData } from './$types';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	let supabase = $state(data.supabase);

	let superform = $state(data.form) as SuperValidated<Infer<typeof UserSchema>>;

	let logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto(Routes.home.url!);
		}
	};
</script>

<div class="flex flex-col">
	<div class="hero">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">
					{$t('profile.hello')}
					{#if data.userData}{data.userData.name}{/if}
				</h1>
				<p class="py-6">
					Tienes {data.notificationsCount} notificaciones pendientes
					<a href={Routes.notification_my.url} class="btn">Ver notificaciones</a>
				</p>
			</div>
		</div>
	</div>
	<div class="container mx-auto px-4">
		<Form schema={UserSchema} {superform} type="user" />
	</div>
	<div class="container mx-auto px-4 flex justify-center items-center">
		<button onclick={logout} class="btn btn-outline btn-warning">Logout</button>
	</div>
</div>
