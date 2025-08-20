import { z } from "zod";

export const PublicMessageSchema = z.object({
  body: z
    .string()
    .max(1000, "Message can not be more than 1000 characters")
    .transform((v) => v.trim())
    .refine((v) => v.length > 0, {
      message: "Message can not be empty",
    }),
});

export const ReplyMessageSchema = z.object({
  messageId: z.string().min(1, "Message id is required"),
  body: z
    .string()
    .max(1000, "Reply can not be more than 1000 characters")
    .transform((v) => v.trim())
    .refine((v) => v.length > 0, {
      message: "Reply can not be empty",
    }),
});

export const UpdateProfileSchema = z.object({
  bio: z
    .string()
    .max(160, "Bio is too long")
    .transform((val) => val.trim())
    .refine((v) => v.length >= 2, {
      message: "Bio must be at least 2 characters",
    })
    .optional(),

  avatarUrl: z.string().url().optional(),

  socials: z.record(z.string(), z.string()).optional(),
});

export type PublicMessageInput = z.infer<typeof PublicMessageSchema>;
export type ReplyMessageInput = z.infer<typeof ReplyMessageSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
