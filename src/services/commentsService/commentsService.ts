// db
import db from "../../db/knex";
// schemas
import { ZodError } from "zod";
import {
  commentsStoreSchemaValidate,
  commentsIndexSchemaValidate,
} from "../../utils/validateSchemas";
// models
import { CommentsModel, PaginationModel } from "../../models/index";

export const storeComments = async (
  params: CommentsModel.CommentsModel
): Promise<CommentsModel.CommentsModel | Error> => {
  try {
    const commentsSchemaValidated = await commentsStoreSchemaValidate(params);
    if (commentsSchemaValidated instanceof ZodError) {
      return commentsSchemaValidated;
    }
    const [id] = await db("comments").insert(params);

    return { ...params, id };
  } catch (error) {
    return error as Error;
  }
};

export const indexComments = async (
  params: CommentsModel.CommentsIndexParamsModel
): Promise<CommentsModel.CommentsIndexResponseModel | Error> => {
  try {
    const { page = 1, per_page = 10, draft_id } = params;

    const result = await db("comments").select().where({ draft_id }).paginate({
      perPage: per_page,
      currentPage: page,
      isLengthAware: true,
    });

    const data = result.data as CommentsModel.CommentsModel[];
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
