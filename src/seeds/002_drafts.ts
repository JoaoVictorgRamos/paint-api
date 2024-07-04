import { Knex } from "knex";
import { defaultDraftSeed } from "../utils/seeds";

exports.seed = async function (knex: Knex): Promise<void> {
  await knex("drafts").del(); // Limpar todos os registros existentes na tabela 'drafts'

  const userIds = await knex.from("users").select("id");

  const draftsData = [
    { image: defaultDraftSeed(), user_id: userIds[0].id },
    { image: defaultDraftSeed(), user_id: userIds[1].id },
    { image: defaultDraftSeed(), user_id: userIds[2].id },
    { image: defaultDraftSeed(), user_id: userIds[3].id },
    { image: defaultDraftSeed(), user_id: userIds[4].id },
  ];

  await knex.transaction(async (trx) => {
    await trx("drafts").insert(draftsData);
  });
};
