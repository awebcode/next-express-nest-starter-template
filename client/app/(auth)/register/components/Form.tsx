"use client";
import React, { useState } from 'react';
import { z } from 'zod';
import ZodHookForm from '@/components/reusables/form/form/ZodForm';
import { registerUser } from '@/app/server_actions/auth';
import { toast } from 'sonner';
import Container from '@/components/reusables/contents/Container';
import BlurCard from '@/components/reusables/contents/BlurCard';
import { registerSchema } from '@/types/zodSchema/auth/user';
import type { ZodInputProps } from '@/types/types';
import { displayErrors, formatErrorsForToast } from '@/utils/formatErrors';

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterFields: ZodInputProps[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    autoComplete: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'current-password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    autoComplete: 'current-password',
  },
];

const RegisterForm = () => {
  const [errors, setErrors] = useState<Record<string, string>[]>([]);

  // Handle form submission
  const onSubmit = async (data: RegisterFormValues) => {
    try {

      // Manually create a new object without `confirmPassword`

      // Alternatively, you can use Object.assign to create the new object
      delete data.confirmPassword;

      // Now `userData` does not include `confirmPassword`
      const response = await registerUser(data);
      if (response.success) {
        toast.success('Registration successful', { description: response?.message });
        // router.push("/"); // Uncomment to redirect after success
      } else {
        setErrors([...response.messages]); // Set errors as an object with key-value pairs
        toast.error('Registration failed', { description: formatErrorsForToast(response.messages) });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="py-8 md:py-16 min-h-screen flex-center">
      <Container>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <BlurCard>
          <ZodHookForm<RegisterFormValues>
            schema={registerSchema}
            onSubmit={onSubmit}
            fields={RegisterFields}
            submitButtonLabel="Register"
          />

        </BlurCard>
        {/* Display errors as key-value pairs */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 text-red-400">
            {displayErrors(errors)}
          </div>
        )}
      </Container>
    </div>
  );
};

export default RegisterForm;
