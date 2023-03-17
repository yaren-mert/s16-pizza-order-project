/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).unique().notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.string("email", 128).unique().notNullable();
      tbl.string("password", 128).notNullable();
      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("malzemeler", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).unique().notNullable();
    })
    .createTable("orders", (tbl) => {
      tbl.increments();
      tbl.string("boyut", 128).notNullable();
      tbl.string("hamur", 128).notNullable();
      tbl.string("note", 512);
      tbl.string("status", 128).notNullable();
      tbl.decimal("ucret", 128).unsigned().notNullable();
      tbl.string("created_at", 128).defaultTo(knex.fn.now()).notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("order_malzemeler", (tbl) => {
      tbl
        .integer("order_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("orders")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("malzeme_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("malzemeler")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.primary(["order_id", "malzeme_id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("order_malzemeler")
    .dropTableIfExists("orders")
    .dropTableIfExists("malzemeler")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
