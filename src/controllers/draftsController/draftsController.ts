// express
import { Request, Response } from "express";
// services
import {
  storeDrafts,
  indexDrafts,
  indexAllDrafts,
} from "../../services/draftsService/draftsService";

export const store = async (
  req: Request,
  res: Response
): Promise<void | Error> => {
  try {
    const serviceDrafts = await storeDrafts(req.body);

    if (serviceDrafts instanceof Error) {
      try {
        const errorMessage = JSON.parse(serviceDrafts.message);
        res.status(400).json({ error: errorMessage });
      } catch (e) {
        res.status(400).json({ error: serviceDrafts.message });
      }
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
    const serviceDrafts = await indexDrafts(req.query);

    if (serviceDrafts instanceof Error) {
      try {
        const errorMessage = JSON.parse(serviceDrafts.message);
        res.status(400).json({ error: errorMessage });
      } catch (e) {
        res.status(400).json({ error: serviceDrafts.message });
      }
    } else {
      res.status(200).json(serviceDrafts);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const indexAll = async (
  req: Request,
  res: Response
): Promise<void | Error> => {
  try {
    const serviceDrafts = await indexAllDrafts(req.body);

    if (serviceDrafts instanceof Error) {
      res.status(400).json({ error: serviceDrafts.message });
    } else {
      res.status(200).json(serviceDrafts);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
