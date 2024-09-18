import { z } from "zod";

// Define your Zod schema for file validation
export const fileSchema = z.object({
  files: z
    .array(
      z.object({
        type: z.string(),
        size: z.number(),
      })
    )
    .refine(
      (files) =>
        files.every(
          (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
        ),
      {
        message: "All files must be images and smaller than 5MB.",
      }
    ),
});

