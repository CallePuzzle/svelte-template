import { z } from 'zod';

const schema = z.object({
	name: z.string().min(3),
	picture: z.string().url()
});

export { schema };
