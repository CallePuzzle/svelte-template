<script lang="ts">
	import { t } from '$lib/translations';

	import type { PageData } from './$types';

	let {
		data
	}: {
		data: PageData;
	} = $props();
</script>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">{$t('index.title')}</h1>
			<p class="py-6">
				{$t('index.paragraph')}
			</p>
		</div>
	</div>
</div>
