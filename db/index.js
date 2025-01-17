const knex = require("knex");
const knexConfig = require("../knexfile");

const env = process.env.NODE_ENV || "development";
const config = knexConfig[env];

module.exports = knex(config);
