'use client';

import { signup } from '@/actions/auth';
import { useActionState } from 'react';

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, {
        values: {},
        errors: {},
    });

    return (
        <form action={action}>
            <h2>Sign up</h2>
            <div>
                <label htmlFor="username">User name</label>
                <input id="username" name="username" placeholder="User name" defaultValue={state.values?.username} />
            </div>
            {state?.errors?.fieldErrors?.username && (
                <p className='error'>{state.errors.fieldErrors.username.join(", ")}</p>
            )}

            <div>
                <label htmlFor="firstname">First name</label>
                <input id="firstname" name="firstname" placeholder="First name" defaultValue={state.values?.firstname} />
            </div>
            {state?.errors?.fieldErrors?.firstname && (
                <p className='error'>{state.errors.fieldErrors.firstname.join(", ")}</p>
            )}

            <div>
                <label htmlFor="lastname">Last name</label>
                <input id="lastname" name="lastname" placeholder="Last name" defaultValue={state.values?.lastname} />
            </div>
            {state?.errors?.fieldErrors?.lastname && (
                <p className='error'>{state.errors.fieldErrors.lastname.join(", ")}</p>
            )}

            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" defaultValue={state.values?.email} />
            </div>
            {state?.errors?.fieldErrors?.email && (
                <p className='error'>{state.errors.fieldErrors.email.join(", ")}</p>
            )}

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
            </div>
            {state?.errors?.fieldErrors?.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.fieldErrors.password.map((e, i) => (
                            <li key={i} className='error'>{e}</li>
                        ))}
                    </ul>
                </div>
            )}

            {state?.errors?.formErrors?.length > 0 && (
                <div>
                    {state.errors.formErrors.map((err, i) => (
                        <p key={i} className='error'>{err}</p>
                    ))}
                </div>
            )}

            <button disabled={pending} type="submit">Sign Up</button>
        </form>
    );
}
