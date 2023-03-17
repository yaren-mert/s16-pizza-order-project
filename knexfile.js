// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/pizza.db3",
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        //sqlite engine'e bağlandığımızda aşağıdaki kod çalışacak:
        conn.run("PRAGMA foreign_keys = ON", done); //FK kullanımını açmaya zorlayacak
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/testing.db3",
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        //sqlite engine'e bağlandığımızda aşağıdaki kod çalışacak:
        conn.run("PRAGMA foreign_keys = ON", done); //FK kullanımını açmaya zorlayacak
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {},
};
