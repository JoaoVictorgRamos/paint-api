// db
import db from "../../db/knex";
// schemas
import { ZodError } from "zod";
import {
  draftStoreSchemaValidate,
  draftIndexSchemaValidate,
} from "../../utils/validateSchemas";
// models
import { DraftsModel, PaginationModel } from "../../models/index";

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

    if (draftCount >= 3) {
      throw new Error("You have reached the 3 draft limit");
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
  params: DraftsModel.IndexAllDraftsParams
): Promise<DraftsModel.IndexAllDraftsResponse | Error> => {
  try {
    const { page = 1, per_page = 10 } = params;

    const result = await db("drafts")
      .select()
      .paginate({ perPage: per_page, currentPage: page });

    const data = result.data as DraftsModel.DraftsModel[];
    const pagination = result.pagination as PaginationModel.PaginationModel;

    return {
      total: pagination.total,
      per_page: pagination.perPage,
      current_page: pagination.currentPage,
      data: data,
    };
  } catch (error) {
    return error as Error;
  }
};
