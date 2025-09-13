import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),

  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be less than 255 characters"),

  image: z
    .string()
    .max(500, "Image path must be less than 500 characters")
    .optional()
    .default("/uploads/users/default.jpg"),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(255, "Name must be less than 255 characters")
    .optional(),

  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters")
    .optional(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be less than 255 characters")
    .optional(),

  image: z
    .string()
    .max(500, "Image path must be less than 500 characters")
    .optional(),
});

export const userIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "User ID must be a positive number")
    .transform(Number),
});
