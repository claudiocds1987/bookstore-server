import { Pool } from 'pg'
require('dotenv').config()

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { "rejectUnauthorized": false },
    port: 5432
})