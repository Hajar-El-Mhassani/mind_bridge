export async function up(knex) {
  await knex.schema.table("users", function (table) {
    //add date-bith column
    table.date("date_of_birth").nullable();
  });
}

export async function down(knex) {
  await knex.schema.table("users", function (table) {
    table.dropColumn("date_of_birth");
  });
}
