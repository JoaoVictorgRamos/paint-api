import { Request, Response } from "express";

import { storeLogin } from "../../services/loginService/loginService";

export const store = async (
  req: Request,
  res: Response
): Promise<void | Error> => {
  try {
    const serviceLogin = await storeLogin(req.body);

    if (serviceLogin instanceof Error) {
      res.status(400).json({ error: serviceLogin.message });
    } else {
      res.status(200).json(serviceLogin);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
