import { z } from 'zod';

const UserSchema = z.object({
	name: z.string().min(3),
	picture: z.string().url()
});

export { UserSchema };
