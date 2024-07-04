// schemas
import {
  userSchemas,
  loginSchema,
  draftsSchema,
  commentsSchema,
} from "../schemas";
// models
import { UserModel, DraftsModel, CommentsModel } from "../models/index";

export const userSchemaValidate = async (
  params: UserModel.UserModel
): Promise<unknown | Error> => {
  try {
    userSchemas.registerSchema.parse(params);
  } catch (error) {
    return error as Error;
  }
};

export const loginSchemaValidate = async (
  params: UserModel.UserModel
): Promise<unknown | Error> => {
  try {
    loginSchema.loginSchema.parse(params);
  } catch (error) {
    return error as Error;
  }
};

export const draftStoreSchemaValidate = async (
  params: DraftsModel.DraftsModel
): Promise<unknown | Error> => {
  try {
    draftsSchema.draftsStoreSchema.parse(params);
  } catch (error) {
    return error as Error;
  }
};

export const draftIndexSchemaValidate = async (
  params: DraftsModel.DraftsIndexModel
): Promise<unknown | Error> => {
  try {
    draftsSchema.draftIndexSchema.parse(params);
  } catch (error) {
    return error as Error;
  }
};

export const commentsStoreSchemaValidate = async (
  params: CommentsModel.CommentsModel
): Promise<unknown | Error> => {
  try {
    commentsSchema.commentsStoreSchema.parse(params);
  } catch (error) {
    return error as Error;
  }
};

export const commentsIndexSchemaValidate = async (
  params: CommentsModel.CommentsModel
): Promise<unknown | Error> => {
  try {
    commentsSchema.commentsIndexSchema.parse(params);
  } catch (error) {
    return error as Error;
  }
};
