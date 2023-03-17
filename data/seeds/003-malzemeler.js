/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("malzemeler").truncate();
  await knex("malzemeler").insert([
    { name: "Pepperoni" },
    { name: "Sosis" },
    { name: "Soğan" },
    { name: "Ananas" },
  ]);
};
