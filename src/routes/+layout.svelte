<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/layout/Nav.svelte';

	let { children, data } = $props();
</script>

<div class="h-screen main-div">
	<Nav userIsLogged={data.userIsLogged} userPicture={data.user?.picture} />
	{@render children()}
</div>
