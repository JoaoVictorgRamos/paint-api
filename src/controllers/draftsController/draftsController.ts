import { Request, Response } from "express";
import { Draft } from "../models/Draft"; // Modelo do Knex para a tabela de rascunhos
import { validationResult } from "express-validator";

export const createDraft = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { image } = req.body;
  const userId = (req as any).user.id;

  // Verificar se o usuário já tem 5 rascunhos
  const draftCount = await Draft.query().where("user_id", userId).count();

  if (draftCount >= 5) {
    return res
      .status(400)
      .json({ message: "Você atingiu o limite de 5 rascunhos" });
  }

  try {
    const newDraft = await Draft.query().insert({
      image,
      user_id: userId,
    });

    res.status(201).json(newDraft);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o rascunho", error });
  }
};
