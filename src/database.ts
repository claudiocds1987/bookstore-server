import { Pool } from 'pg'
require('dotenv').config()

export const pool = new Pool({
    user: 'ohcmjxflybhuxs',
    host: 'ec2-54-90-13-87.compute-1.amazonaws.com',
    password: '87a7776853846d79ec4826d8f7c8a7a4b7d1cb6a1b94f13d88a34a06ebe93d30',
    database: 'd6mtnl8db77ln6',
    //ssl: true,
    ssl: { "rejectUnauthorized": false },
    port: 5432
})

// export const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     ssl: { "rejectUnauthorized": false },
//     port: 5432
// })