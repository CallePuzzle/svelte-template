import { z } from 'zod';

const UserSchema = z.object({
	name: z.string().min(3),
	email: z.string().email().readonly(),
	picture: z.string().url()
});

export { UserSchema };
