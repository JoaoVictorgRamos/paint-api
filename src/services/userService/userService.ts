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
// params
import { Request } from "express";

export const storeUser = async (
  params: UserModel.UserModel
): Promise<UserModel.userToken | Error> => {
  try {
    const userSchemaValidated = await userSchemaValidate(params);
    if (userSchemaValidated instanceof ZodError) {
      return userSchemaValidated;
    }

    params.password = await encrypt(params.password);

    const [id] = await db("users").insert(params);
    const token = generateToken(id);

    return { token };
  } catch (error) {
    return error as Error;
  }
};

export const indexGetMe = async (
  req: Request
): Promise<
  | (Omit<UserModel.User, "password" | "token"> & { averageRating: number })
  | Error
> => {
  try {
    const userId = (req as any).user.id;

    if (!userId) {
      throw new Error("user_id não econtrado!");
    }

    const user = await db("users")
      .select("id", "name", "email")
      .where({ id: userId })
      .first();

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const ratings = await db("comments")
      .where({ user_id: userId })
      .pluck("rating");

    const validRatings = ratings.filter((rating) => rating !== null);

    const averageRating =
      validRatings.length > 0
        ? validRatings.reduce((acc, rating) => acc + parseFloat(rating), 0) /
          validRatings.length
        : 0;

    return { ...user, averageRating } as Omit<
      UserModel.User,
      "password" | "token"
    > & {
      averageRating: number;
    };
  } catch (error) {
    return error as Error;
  }
};
