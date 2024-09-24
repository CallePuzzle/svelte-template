<script lang="ts">
	import { Routes } from '$lib/routes';

	export let userIsLogged: boolean;
	export let userPicture: string | null | undefined;

</script>

<div class="navbar bg-base-100">
	<div class="flex gap-2">
		{#if userIsLogged}
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar indicator">
				<div class="w-10 rounded-full">
					<a href={Routes.profile.url} aria-label="Go to profile"><img alt="Profile" src={userPicture} /></a>
				</div>
			</div>
		{:else}
			<ul class="menu menu-horizontal px-1">
				<li><a href={Routes.login.url}>Login</a></li>
			</ul>
		{/if}
	</div>
</div>
