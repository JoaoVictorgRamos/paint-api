// db
import db from "../../db/knex";
// params
import { ParsedQs } from "qs";
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
      throw new Error("Você atingiu o limite de 3 rascunhos!");
    }

    const [id] = await db("drafts").insert(params);

    return { ...params, id };
  } catch (error) {
    return error as Error;
  }
};

export const indexDrafts = async (
  params: ParsedQs
): Promise<(DraftsModel.DraftsModel & { averageRating: number })[] | Error> => {
  try {
    const draftsSchemaValidated = await draftIndexSchemaValidate(params);
    if (draftsSchemaValidated instanceof ZodError) {
      return draftsSchemaValidated;
    }
    const user_id = parseInt(params.user_id as string, 10);

    if (isNaN(user_id) || user_id <= 0) {
      throw new Error("Parâmetro user_id inválido!");
    }

    const userExists = await db("users").where({ id: params.user_id }).first();

    if (!userExists) {
      throw new Error("O ID do usuário não existe!");
    }

    const drafts: (DraftsModel.DraftsModel & { averageRating: number })[] =
      await db("drafts").where({ user_id }).select();

    for (const draft of drafts) {
      const ratings = await db("comments")
        .where({ draft_id: draft.id })
        .pluck("rating");

      const validRatings = ratings.filter((rating) => rating !== null);

      draft.averageRating =
        validRatings.length > 0
          ? validRatings.reduce((acc, rating) => acc + parseFloat(rating), 0) /
            validRatings.length
          : 0;
    }

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
