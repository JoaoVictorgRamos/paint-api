import { Knex } from "knex";
import { encrypt } from "../utils/bcrypt";
import { generateRandomString } from "../utils/seeds";

exports.seed = async function (knex: Knex): Promise<void> {
  await knex("users").del(); // Remove todos os registros existentes na tabela 'users'

  const password = await encrypt("Teste@123");

  const usersData = [
    {
      name: generateRandomString(),
      email: generateRandomString().toLowerCase() + "@example.com",
      password: password,
    },
    {
      name: generateRandomString(),
      email: generateRandomString().toLowerCase() + "@example.com",
      password: password,
    },
    {
      name: generateRandomString(),
      email: generateRandomString().toLowerCase() + "@example.com",
      password: password,
    },
    {
      name: generateRandomString(),
      email: generateRandomString().toLowerCase() + "@example.com",
      password: password,
    },
    {
      name: generateRandomString(),
      email: generateRandomString().toLowerCase() + "@example.com",
      password: password,
    },
  ];

  await knex.transaction(async (trx) => {
    await trx("users").insert(usersData);
  });
};
