/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("name", 150).notNullable();
    t.string("email", 255).notNullable().unique();
    t.string("password", 255).notNullable();
    t.string("image", 500).nullable(); // add image column for profile picture
    t.timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
