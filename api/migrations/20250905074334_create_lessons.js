/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/** @param {import('knex').Knex} knex */
export async function up(knex) {
  await knex.schema.createTable("lessons", (t) => {
    t.increments("id").primary();
    t.string("title", 200).notNullable();
    t.text("content").notNullable();
    t.timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    t.integer("course_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("courses")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    t.index(["course_id"], "lessons_course_id_idx");
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("lessons");
}
