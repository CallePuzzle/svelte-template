<script lang="ts">
	import { t } from '$lib/translations';
</script>

<div class="flex flex-col">
	<div class="hero">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">
					{$t('profile.hello')}
				</h1>
			</div>
		</div>
	</div>
	<div class="container mx-auto px-4">
		<form method="POST" action="?/login">
			<label>
				Email
				<input name="email" type="email" />
			</label>
			<button>Login</button>
		</form>
	</div>
</div>
