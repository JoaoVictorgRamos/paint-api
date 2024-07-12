// db
import db from "../../db/knex";
// encrypt
import { compare } from "../../utils/bcrypt";
// jwt
import { generateToken } from "../../utils/jwt";
// schemas
import { ZodError } from "zod";
import { loginSchemaValidate } from "../../utils/validateSchemas";
// models
import { UserModel } from "../../models/index";

export const storeLogin = async (
  params: UserModel.UserModel
): Promise<UserModel.userToken | Error> => {
  try {
    const loginSchemaValidated = await loginSchemaValidate(params);
    if (loginSchemaValidated instanceof ZodError) {
      return loginSchemaValidated;
    }

    const user = await db<UserModel.UserModel>("users")
      .where({ email: params.email })
      .first();

    if (!user || !user.id) {
      throw new Error("Usuário não encontrado!");
    }

    const isPasswordValid = await compare(params.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha inválida!");
    }

    const token = generateToken(user.id);

    return {
      token: token,
    };
  } catch (error) {
    return error as Error;
  }
};
