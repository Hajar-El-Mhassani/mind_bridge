/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("lessons").del();
  await knex("lessons")
    .insert([
      {
        id: 1,
        title: "JavaScript Basics",
        content: "Introduction to JavaScript, variables, and data types.",
        course_id: 1,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        id: 2,
        title: "JavaScript Functions",
        content: "Understanding functions, scope, and closures in JavaScript.",
        course_id: 1,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        id: 3,
        title: "PostgreSQL Indexing",
        content:
          "Learn about indexing strategies in PostgreSQL for performance optimization.",
        course_id: 2,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
    ])
    .onConflict("id")
    .ignore();
}
