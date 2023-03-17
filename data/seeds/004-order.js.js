/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("order_malzemeler").truncate();
  await knex("orders").truncate();
  await knex("orders").insert([
    {
      boyut: "Büyük",
      hamur: "Kalın",
      note: "Zeytin olmasın",
      ucret: 100,
      status: "Hazırlanıyor",
      user_id: 2,
    },
    {
      boyut: "Küçük",
      hamur: "İnce",
      ucret: 90,
      status: "Sırada bekliyor",
      user_id: 2,
    },
    {
      boyut: "Orta",
      hamur: "Parmesan Kenar",
      ucret: 55,
      status: "Hazırlandı",
      user_id: 2,
    },
  ]);

  await knex("order_malzemeler").insert([
    { malzeme_id: 1, order_id: 1 },
    { malzeme_id: 2, order_id: 1 },
    { malzeme_id: 3, order_id: 1 },
    { malzeme_id: 3, order_id: 2 },
  ]);
};
