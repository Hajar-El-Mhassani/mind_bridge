export async function up(knex) {
  await knex.schema.table("users", function (table) {
    //add date-bith column
    table.date("date_birth").nullable();
  });
}

export async function down(knex) {
  await knex.schema.table("users", function (table) {
    table.dropColumn("date_birth"); // remove date_birth if rollback
  });
}
