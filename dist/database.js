"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'ohcmjxflybhuxs',
    host: 'ec2-54-90-13-87.compute-1.amazonaws.com',
    password: '87a7776853846d79ec4826d8f7c8a7a4b7d1cb6a1b94f13d88a34a06ebe93d30',
    database: 'd6mtnl8db77ln6',
    //ssl: true,
    ssl: { "rejectUnauthorized": false },
    port: 5432
});
