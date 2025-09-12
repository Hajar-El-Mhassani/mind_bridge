export async function up(knex) {
  await knex.schema.table("courses", function (table) {
    table.dropColumn("enrolled"); // remove the enrolled column
    table.integer("duration").notNullable().defaultTo(0); // add duration column
  });
}

export async function down(knex) {
  await knex.schema.table("courses", function (table) {
    table.dropColumn("duration"); // remove duration if rollback
    table.integer("enrolled").notNullable().defaultTo(0); // restore enrolled
  });
}
