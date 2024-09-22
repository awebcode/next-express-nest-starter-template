"use client";
import React from 'react';

import { z } from 'zod';
import type { ZodInputProps } from '@/types/types';
import ZodHookForm from '@/components/reusables/form/form/ZodForm';
import { loginSchema } from '@/types/zodSchema/auth/user';
import { signInWithCredentials } from '@/app/server_actions/auth';
import { toast } from 'sonner';
import Container from '@/components/reusables/contents/Container';
import BlurCard from '@/components/reusables/contents/BlurCard';



type LoginFormValues = z.infer<typeof loginSchema>;

// Define login form fields
const loginFields: ZodInputProps[] = [
    {
        name: "email",
        label: "Email",
        type: "email",
        description: "Enter your email",
        autoComplete: "email"
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        description: "Enter your password",
        autoComplete: "current-password"
    }
];

const LoginForm = () => {
    // const router = useRouter();

    // Handle form submission
    const onSubmit = async (data: LoginFormValues) => {
        const response = await signInWithCredentials(data);
        if (response.success) {
            toast.success("Login successful");
            // router.push("/");
        } else {
            toast.error("Login failed", {
                description: "Invalid email or password",
            });
        }
    };

    return (
        <div className="py-8 md:py-16 min-h-screen flex-center">
            <Container> <h2 className="text-2xl font-bold mb-4">Login</h2>
                <BlurCard>
                    <ZodHookForm<LoginFormValues>
                        schema={loginSchema}
                        onSubmit={onSubmit}
                        fields={loginFields}
                        submitButtonLabel="Login"
                    />
                </BlurCard>
            </Container>
        </div>
    );
};

export default LoginForm;
