"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserByUserName = exports.existeUserEmail = exports.existUsername = exports.getUsers = void 0;
// conexion a db
const database_1 = require("../database");
// npm install bcrypt
const bcrypt = require('bcrypt');
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * from users order by registration_date desc');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
exports.existUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.username) {
        res.status(400).send('FALTA CONTENIDO EN EL CUERPO');
        return;
    }
    console.log('username recibido:' + req.params.username);
    try {
        const response = yield database_1.pool.query(`SELECT * FROM users WHERE username LIKE '${req.params.username}'`);
        if (res.json(response.rowCount > 0)) {
            // return true
            return res.status(200);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json('error al buscar el username');
    }
});
exports.existeUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.email) {
        res.status(400).send('FALTA CONTENIDO EN EL CUERPO');
        return;
    }
    console.log('email recibido:' + req.params.email);
    try {
        const response = yield database_1.pool.query(`SELECT * FROM users WHERE email LIKE '%${req.params.email}%'`);
        if (res.json(response.rowCount > 0)) {
            // si existe email return true
            return res.status(200);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json('error al buscar el email de usuario');
    }
});
exports.getUserByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(`SELECT * FROM users WHERE username = '${req.params.username}'`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('error al buscar el usuario por username');
    }
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, birthdate, email, pass, adress, state, username } = (req.body);
    yield database_1.pool.query('UPDATE users set name = $1, surname = $2, birthdate = $3, email = $4, pass = $5, adress = $6, state = $7 WHERE username = $8', [name, surname, birthdate, email, pass, adress, state, username]);
    return res.json(`El usuario ${req.params.username} ah sido actualizado exitosamente!`);
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.pool.query('DELETE FROM users WHERE username = $1', [req.params.username]);
    return res.json(`El usuario ${req.params.username} ah sido eliminado exitosamente!`);
});
