<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/layout/Nav.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { SubscribeUser } from '$lib/notification/subscribe-user';
	import { Routes } from '$lib/routes';
	import { t } from '$lib/translations';

	import type { PageData } from './$types';
	import type { Snippet } from 'svelte';

	let { children, data }: { children: Snippet; data: PageData } = $props();

	onMount(async () => {
		await Notification.requestPermission();
		if ('serviceWorker' in navigator && data.userIsLogged) {
			const reg = await navigator.serviceWorker.ready;
			await SubscribeUser(data.userIsLogged, data.user?.id as string, reg, data.JWKpublicKey);
		}
	});
</script>

<Toaster position="top-center" richColors />

<div class="h-screen main-div">
	<Nav
		userIsLogged={data.userIsLogged}
		userPicture={data.user?.picture || ''}
		notificationsCount={data.notificationsCount}
	/>
	{#if data.isProtectedRoute && !data.userIsLogged}
		<div class="alert alert-error">
			<p>{data.protectedRouteMessage}</p>
			<p>
				<a href={Routes.login.url} class="btn btn-accent">{Routes.login.name}</a>
			</p>
		</div>
	{:else}
		{@render children()}
	{/if}
</div>
