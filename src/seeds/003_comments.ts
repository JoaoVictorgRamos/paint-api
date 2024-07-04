import { Knex } from "knex";
import { generateRandomComment } from "../utils/seeds";

exports.seed = async function (knex: Knex): Promise<void> {
  await knex("comments").del(); // Limpar todos os registros existentes na tabela 'comments'

  const userIds = await knex.from("users").select("id");

  const draftIds = await knex.from("drafts").select("id");

  const commentsData = [
    {
      comment: generateRandomComment(),
      user_id: userIds[0].id,
      draft_id: draftIds[0].id,
      rating: 4.5,
    },
    {
      comment: generateRandomComment(),
      user_id: userIds[1].id,
      draft_id: draftIds[1].id,
      rating: 3.8,
    },
    {
      comment: generateRandomComment(),
      user_id: userIds[2].id,
      draft_id: draftIds[2].id,
      rating: 2.3,
    },
    {
      comment: generateRandomComment(),
      user_id: userIds[3].id,
      draft_id: draftIds[3].id,
      rating: 5.0,
    },
    {
      comment: generateRandomComment(),
      user_id: userIds[4].id,
      draft_id: draftIds[4].id,
      rating: 1.2,
    },
  ];

  await knex.transaction(async (trx) => {
    await trx("comments").insert(commentsData);
  });
};
