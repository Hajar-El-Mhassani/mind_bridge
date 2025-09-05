export async function up(knex) {
  await knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("email").notNullable().unique();
    t.string("name").notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
