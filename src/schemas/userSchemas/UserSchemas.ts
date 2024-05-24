import { z } from "zod";

export const emailSchema = z.string().email("E-mail inválido");

export const nameSchema = z
  .string()
  .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
  .refine((name) => /^[A-Z][a-z]*$/.test(name), {
    message: "A primeira letra do nome deve ser maiúscula",
  });

export const passwordSchema = z
  .string()
  .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
  .regex(/[A-Z]/, {
    message: "A senha deve conter pelo menos uma letra maiúscula",
  })
  .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "A senha deve conter pelo menos um caractere especial",
  });
