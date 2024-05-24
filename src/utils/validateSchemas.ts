// schemas
import { userSchemas, loginSchema, draftsSchema } from "../schemas";
// models
import { UserModel, DraftsModel } from "../models/index";

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
