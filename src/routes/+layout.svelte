<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/layout/Nav.svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	let { children, data } = $props();

	$effect(async () => {
		const status = await Notification.requestPermission();
		if ('serviceWorker' in navigator && data.userIsLogged) {
			const reg = await navigator.serviceWorker.ready;
			await SubscribeUser(data.userIsLogged, data.user.id, reg, data.JWKpublicKey);
		}

		if (data.notifications && data.path !== Routes.notification_my.url) {
			if (data.notificationsCount == 1) {
				toast('Tienes una notificación sin leer', {
					icon: '🔔'
				});
			} else if (data.notificationsCount > 1) {
				toast(`Tienes ${data.notificationsCount} notificaciones sin leer`, {
					icon: '🔔'
				});
			}
		}
	});
</script>

<Toaster />

<div class="h-screen main-div">
	<Nav userIsLogged={data.userIsLogged} userPicture={data.user?.picture || ""}  notificationsCount={data.notificationsCount}/>
	{@render children()}
</div>
