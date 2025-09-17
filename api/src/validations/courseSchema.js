import { z } from "zod";
export const courseSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    status: z.enum(["draft", "published", "archived"]),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    price: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((val) => val >= 0),
    duration: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((val) => val > 0),
    image: z.string().optional(),
  })
  .passthrough();
