// db
import db from "../../db/knex";
// schemas
import { ZodError } from "zod";
import {
  draftStoreSchemaValidate,
  draftIndexSchemaValidate,
} from "../../utils/validateSchemas";
// models
import { DraftsModel } from "../../models/index";

export const storeDrafts = async (
  params: DraftsModel.DraftsModel
): Promise<DraftsModel.DraftsModel | Error> => {
  try {
    const draftsSchemaValidated = await draftStoreSchemaValidate(params);
    if (draftsSchemaValidated instanceof ZodError) {
      return draftsSchemaValidated;
    }

    const draftCountDB: { count: string }[] = await db("drafts")
      .where({ user_id: params.user_id })
      .count({ count: "*" });

    const draftCount: number = parseInt(draftCountDB[0].count, 10);

    if (draftCount >= 5) {
      throw new Error("You have reached the 5 draft limit");
    }

    const [id] = await db("drafts").insert(params);

    return { ...params, id };
  } catch (error) {
    return error as Error;
  }
};

export const indexDrafts = async (
  params: DraftsModel.DraftsIndexModel
): Promise<DraftsModel.DraftsModel[] | Error> => {
  try {
    const draftsSchemaValidated = await draftIndexSchemaValidate(params);
    if (draftsSchemaValidated instanceof ZodError) {
      return draftsSchemaValidated;
    }

    const userExists = await db("users").where({ id: params.user_id }).first();

    if (!userExists) {
      throw new Error("User ID does not exist");
    }

    const drafts: DraftsModel.DraftsModel[] = await db("drafts")
      .where({ user_id: params.user_id })
      .select();

    return drafts;
  } catch (error) {
    return error as Error;
  }
};

export const indexAllDrafts = async (
  params: any
): Promise<DraftsModel.DraftsModel[] | Error> => {
  try {
    params = 1;
    // paginate
    const drafts: DraftsModel.DraftsModel[] = await db("drafts").select();

    return drafts;
  } catch (error) {
    return error as Error;
  }
};
