const pgp = require('pg-promise')()

const port = process.env.PG_PORT || 5432
const host = process.env.PG_HOST || 'localhost'

//TODO decide on database name and mrcoffee with it
const connection = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${host}:${port}/mrcoffee`

const db = pgp(connection)

module.exports = db