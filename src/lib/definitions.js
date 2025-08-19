import { z } from 'zod';

export const SignupFormSchema = z.object({
    username: z
        .string()
        .min(6, { error: 'User name must be at least 6 characters long.' })
        .trim(),
    firstname: z
        .string()
        .min(3, { error: 'First name must be at least 3 characters long.' })
        .trim(),
    lastname: z
        .string()
        .min(3, { error: 'Last name must be at least 3 characters long.' })
        .trim(),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long.' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),
});
