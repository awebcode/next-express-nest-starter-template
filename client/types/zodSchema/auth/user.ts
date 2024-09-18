import { z } from "zod";

// Base schema without password confirmation refinement
export const userSchema = z.object({
  id: z.string(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .nonempty("Password cannot be empty")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string().min(1,"Confirm Password cannot be empty").optional(), // Optional unless used in registerSchema
  name: z.string().min(3, "Name must be at least 3 characters long"),
  emailVerified: z.date().nullable().optional(),
  image: z.string().nullable().optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
  providerId: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Login schema (no confirmPassword needed)
export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

// Create user schema (with confirmPassword refinement)
export const registerSchema = userSchema
  .pick({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be shown for confirmPassword field
  });

// Type inference for User
export type User = z.infer<typeof userSchema>;
