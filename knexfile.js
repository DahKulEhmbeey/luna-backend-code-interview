require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DEV_DB_CONNECTION_STRING || "postgres://localhost/postgres",
    migrations: {
      directory: './db/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host:     process.env.DB_HOST || '',
      port:     process.env.DB_PORT || 0,
      user:     process.env.DB_USER || 'username',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_DATABASE || 'my_db'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    }
  }

};
