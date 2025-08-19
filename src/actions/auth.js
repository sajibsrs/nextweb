import { SignupFormSchema } from "@/lib/definitions";
import { z } from 'zod';

export async function signup(state, formData) {
    const data = {
        username: formData.get('username') || "",
        firstname: formData.get('firstname') || "",
        lastname: formData.get('lastname') || "",
        email: formData.get('email') || "",
        password: formData.get('password') || "",
    };

    const validation = SignupFormSchema.safeParse(data);

    if (!validation.success) {
        const { fieldErrors, formErrors } = z.flattenError(validation.error);
        return { values: data, errors: { fieldErrors, formErrors } };
    }

    // Continue with DB insertion…
    return { values: data, success: true };
}
