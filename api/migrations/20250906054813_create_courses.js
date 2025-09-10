export function up(knex) {
  return knex
    .raw(
      `
    -- Create enum types if they don't exist
    DO $$ BEGIN
      CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `
    )
    .then(() => {
      return knex.schema.createTable("courses", (table) => {
        table.increments("id").primary();
        table.string("title", 255).notNullable();
        table.text("description");
        table.string("image", 500).defaultTo("/uploads/courses/default.jpg");
        table.integer("enrolled").defaultTo(0);
        table.decimal("price", 10, 2).defaultTo(0);
        table.string("category", 100);
        table.specificType("status", "course_status").defaultTo("draft");
        table.specificType("level", "course_level").defaultTo("beginner");
        table
          .integer("created_by")
          .unsigned()
          .references("id")
          .inTable("users")
          .onDelete("SET NULL");
        table.timestamps(true, true);
      });
    });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("courses").then(() => {
    return knex.raw(`
        DROP TYPE IF EXISTS course_level;
        DROP TYPE IF EXISTS course_status;
      `);
  });
}
