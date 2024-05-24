import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();
    table.string("comment").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("draft_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("drafts")
      .onDelete("CASCADE");
    table.decimal("rating", 2, 2).nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("comments");
}
