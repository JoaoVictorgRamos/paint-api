// db
import db from "../../db/knex";
// encrypt
import { encrypt } from "../../utils/bcrypt";
// jwt
import { generateToken } from "../../utils/jwt";
// schemas
import { ZodError } from "zod";
import { userSchemaValidate } from "../../utils/validateSchemas";
// models
import { UserModel } from "../../models/index";

export const storeUser = async (
  params: UserModel.UserModel
): Promise<UserModel.User | Error> => {
  try {
    const userSchemaValidated = await userSchemaValidate(params);
    if (userSchemaValidated instanceof ZodError) {
      return userSchemaValidated;
    }

    params.password = await encrypt(params.password);

    const [id] = await db("users").insert(params);
    const token = generateToken(id);

    return { ...params, id, token };
  } catch (error) {
    return error as Error;
  }
};
