import type { EmailOtpType } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { logger } from '@/server/logger';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const channelAll = supabase.channel('room-all');

	channelAll.subscribe((status) => {
		// Wait for successful connection
		if (status !== 'SUBSCRIBED') {
			return null;
		}

		// Send a message once the client is subscribed
		channelAll.send({
			type: 'broadcast',
			event: 'test',
			payload: { message: 'hello, world' }
		});
	});

	return new Response('ok', {
		status: 200
	});
};
