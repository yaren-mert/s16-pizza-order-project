/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").truncate();
  await knex("users").insert([
    {
      name: "Yaren Mert",
      email: "yaren@wit.com.tr",
      password: "1234",
      role_id: 1,
    }, //TO DO: password hash sonrası güncelle.
    {
      name: "Emel Mert",
      email: "emel@wit.com.tr",
      password: "1234",
      role_id: 2,
    },
  ]);
};
