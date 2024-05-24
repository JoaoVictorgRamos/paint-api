import bcrypt from "bcryptjs";

export const encrypt = async (hash: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashEncrypt = await bcrypt.hash(hash, salt);
  return hashEncrypt;
};
