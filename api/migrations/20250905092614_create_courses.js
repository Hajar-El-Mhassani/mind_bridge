export async function up(knex) {
  await knex.schema.createTable("courses", (t) => {
    t.increments("id").primary();
    t.string("title", 255).notNullable();
    t.text("description").notNullable();
    t.timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    t.integer("enrolled").notNullable().defaultTo(0);
    t.decimal("price", 10, 2).notNullable().defaultTo(0);
    t.string("category", 255).notNullable();
    t.enu("status", ["draft", "published", "archived"], {
      useNative: true,
      enumName: "course_status",
    })
      .notNullable()
      .defaultTo("draft");
    t.enu("level", ["beginner", "intermediate", "advanced"], {
      useNative: true,
      enumName: "course_level",
    })
      .notNullable()
      .defaultTo("beginner");
    t.integer("created_by")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
}
export async function down(knex) {
  await knex.schema.dropTableIfExists("courses");
}
