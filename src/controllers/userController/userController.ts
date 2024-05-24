import { Request, Response } from "express";

import { storeUser } from "../../services/userService/userService";

export const store = async (
  req: Request,
  res: Response
): Promise<void | Error> => {
  try {
    const serviceUser = await storeUser(req.body);
    res.status(200).json(serviceUser);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const index = async (
  req: Request,
  res: Response
): Promise<void | Error> => {
  try {
    res.status(201).json({ message: "GET OK" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
