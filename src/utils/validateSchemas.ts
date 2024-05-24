// schemas
import { userSchemas } from "../schemas";
// models
import { modelUser } from "../models/userModel/userModel";

export const userSchemaValidate = async (
  params: modelUser
): Promise<void | Error> => {
  try {
    userSchemas.nameSchema.parse(params.name);
    userSchemas.emailSchema.parse(params.email);
    userSchemas.passwordSchema.parse(params.password);
  } catch (error) {
    return error as Error;
  }
};
