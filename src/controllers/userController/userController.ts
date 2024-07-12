import { Request, Response } from "express";

import { storeUser, indexGetMe } from "../../services/userService/userService";

export const store = async (
  req: Request,
  res: Response
): Promise<void | Error> => {
  try {
    const serviceUser = await storeUser(req.body);
    if (serviceUser instanceof Error) {
      try {
        const errorMessage = JSON.parse(serviceUser.message);
        res.status(400).json({ error: errorMessage });
      } catch (e) {
        res.status(400).json({ error: serviceUser.message });
      }
    } else {
      res.status(200).json(serviceUser);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceUser = await indexGetMe(req);

    if (serviceUser instanceof Error) {
      res.status(400).json({ error: serviceUser.message });
    } else {
      res.status(200).json(serviceUser);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao buscar dados do usuário!" });
  }
};
