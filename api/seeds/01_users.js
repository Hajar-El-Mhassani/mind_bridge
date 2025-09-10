/** @param {import('knex').Knex} knex */
export async function seed(knex) {
  // Clear existing rows
  await knex("users").del();

  // Insert sample users
  await knex("users")
    .insert([
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "hashed_password1", // normally bcrypt hash
        image: "/uploads/users/default.jpg", // path to default profile picture
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: "hashed_password2",
        image: "/uploads/users/default.jpg",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
      {
        name: "Charlie Brown",
        email: "charlie@example.com",
        password: "hashed_password3",
        image: "/uploads/users/default.jpg",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      },
    ])
    .onConflict("id")
    .ignore();
}
