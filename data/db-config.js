const knex = require("knex");
const config = require("../knexfile");

const { NODE_ENV } = require("../config/index");

module.exports = knex(config[NODE_ENV]);
