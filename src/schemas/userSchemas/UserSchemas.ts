import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
    .refine(
      (name) =>
        /^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]*(\s[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]*)*$/.test(name),
      {
        message: "Cada nome e sobrenome deve começar com uma letra maiúscula",
      }
    ),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "A senha deve conter pelo menos um caractere especial",
    }),
});
