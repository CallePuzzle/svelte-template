import { auth0 } from '$lib/server/auth';
import { generateState } from 'arctic';
import { redirect } from '@sveltejs/kit';

import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const state = generateState();
	const scopes = ['openid', 'profile'];

	const url = await auth0.createAuthorizationURL(state, scopes);

	event.cookies.set('auth0_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	return redirect(302, url.toString());
}
