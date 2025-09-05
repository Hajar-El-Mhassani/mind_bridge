export async function seed(knex) {
  await knex("users").del();
  await knex("users").insert([
    { email: "admin@mindbridge.dev", name: "Admin" },
    { email: "test@mindbridge.dev", name: "Test User" },
  ]);
}
