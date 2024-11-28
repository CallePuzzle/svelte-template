<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
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

		const supabase = data.supabase;
		const channelAll = supabase.channel('room-all');

		function messageReceived(payload: any) {
			console.log(payload);
		}

		// Subscribe to the Channel
		channelAll
			.on('broadcast', { event: 'test' }, (payload) => messageReceived(payload))
			.subscribe();
	});
</script>

<Toaster position="top-center" richColors />

<div class="h-screen main-div">
	<Nav
		userIsLogged={data.userIsLogged}
		userPicture={data.userData?.picture || ''}
		notificationsCount={data.notificationsCount}
	/>
	{@render children()}
</div>
