import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { Token } from "./../models/userModel/userModel";

const secretKey =
  process.env.JWT_SECRET ||
  "16a291b8713096b0070f25c61a15883d274353113e459863883e52a9e4b369be";

export const generateToken = (userId: number): Token => {
  return {
    access_token: jwt.sign({ id: userId }, secretKey, {
      expiresIn: "365d", // Token expira em 365 dias
    }),
    type: "Bearer ",
    expires: "365",
  };
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Token inválido ou expirado");
  }
};
