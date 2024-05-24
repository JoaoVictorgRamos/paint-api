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
import { UserModel, userLogin } from "../../models/userModel/userModel";

export const storeLogin = async (
  params: UserModel
): Promise<userLogin | Error> => {
  try {
    const loginSchemaValidated = await loginSchemaValidate(params);
    if (loginSchemaValidated instanceof ZodError) {
      return loginSchemaValidated;
    }

    const user = await db<UserModel>("users")
      .where({ email: params.email })
      .first();

    if (!user || !user.id) {
      throw new Error("User not found");
    }

    const isPasswordValid = await compare(params.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  } catch (error) {
    return error as Error;
  }
};
