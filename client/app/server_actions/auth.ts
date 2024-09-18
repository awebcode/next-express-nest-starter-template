"use server";

import { signIn } from "@/auth";
import type { registerSchema, loginSchema } from "@/types/zodSchema/auth/user";
import type { z } from "zod";
import { ENV_VARS } from "@/config/env.config";
import type { JWT } from "next-auth/jwt";
export async function signInWithCredentials(formData: z.infer<typeof loginSchema>) {
  try {
    await signIn("credentials", { ...formData, redirect: false });

    return { success: true };
  } catch {
    return { success: false };
  }
}

export const registerUser = async (formData: z.infer<typeof registerSchema>) => {
  try {
    const { confirmPassword, ...data } = formData;

    const res = await fetch(`${ENV_VARS.baseApiUri}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (!res.ok) {
      // return {...response}
    }
    return response;
  } catch (err: any) {
    return { ...err };
  }
};

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${ENV_VARS.baseApiUri}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Parse the response
    const response = await res.json();

    // Log the response for debugging

    if (!res.ok) {
      // Extract error messages from the response
      return null;
    }

    return response;
  } catch {
    // Catch and rethrow any other errors
    return null;
  }
}

export async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(ENV_VARS.baseApiUri + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token.backendTokens?.refreshToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }
  console.log("Refreshed token");
  const response = await res.json();
  return {
    ...token,
    backendTokens: response,
  };
}
