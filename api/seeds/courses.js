/** @param {import('knex').Knex} knex */
export async function seed(knex) {
  // Clear existing rows
  await knex("courses").del();

  // Insert sample courses (created_by references users.id)
  await knex("courses")
    .insert([
      {
        id: 1,
        title: "Intro to JavaScript",
        description: "Learn the basics of JS programming.",
        enrolled: 10,
        price: 49.99,
        category: "Programming",
        status: "published",
        level: "beginner",
        created_by: 1,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        id: 2,
        title: "Advanced Databases",
        description: "Deep dive into PostgreSQL and indexing.",
        enrolled: 5,
        price: 99.99,
        category: "Databases",
        status: "draft",
        level: "advanced",
        created_by: 2,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        id: 3,
        title: "Web Development with React",
        description: "Build dynamic web apps using React.js.",
        enrolled: 20,
        price: 79.99,
        category: "Web Development",
        status: "published",
        level: "intermediate",
        created_by: 3,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        id: 4,
        title: "Data Science Fundamentals",
        description: "Introduction to data analysis and visualization.",
        enrolled: 15,
        price: 59.99,
        category: "Data Science",
        status: "archived",
        level: "beginner",
        created_by: 1,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
    ])
    .onConflict("id")
    .ignore();
}
