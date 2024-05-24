import { z } from "zod";

const base64ImageRegex =
  /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,[A-Za-z0-9+/]+={0,2}$/;

export const draftsStoreSchema = z.object({
  image: z
    .string()
    .regex(
      base64ImageRegex,
      "A string da imagem deve ser um base64 válido com prefixo data:image/"
    ),
  user_id: z.number().positive().int().nonnegative(),
});

export const draftIndexSchema = z.object({
  user_id: z.number().positive().int().nonnegative(),
});
