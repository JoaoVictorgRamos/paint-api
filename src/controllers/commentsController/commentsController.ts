// express
import { Request, Response } from "express";
// services
import {
  storeComments,
  indexComments,
} from "../../services/commentsService/commentsService";

export const store = async (
  req: Request,
  res: Response
): Promise<void | Error> => {
  try {
    const serviceDrafts = await storeComments(req.body);

    if (serviceDrafts instanceof Error) {
      res.status(400).json({ error: serviceDrafts.message });
    } else {
      res.status(200).json(serviceDrafts);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const index = async (
  req: Request,
  res: Response
): Promise<void | Error> => {
  try {
    const serviceDrafts = await indexComments(req.body);

    if (serviceDrafts instanceof Error) {
      res.status(400).json({ error: serviceDrafts.message });
    } else {
      res.status(200).json(serviceDrafts);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
