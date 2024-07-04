import { z } from "zod";

export const commentsStoreSchema = z.object({
  comment: z.string().max(250),
  user_id: z.number().positive().int().nonnegative(),
  draft_id: z.number().positive().int().nonnegative(),
});

export const commentsIndexSchema = z.object({
  user_id: z.number().positive().int().nonnegative(),
  draft_id: z.number().positive().int().nonnegative(),
});
