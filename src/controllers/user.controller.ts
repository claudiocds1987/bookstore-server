import { Request, Response } from 'express'
import { QueryResult } from 'pg'
// conexion a db
import { pool } from '../database'
// npm install bcrypt
const bcrypt = require('bcrypt');

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * from users order by registration_date desc');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
}

export const existUsername = async (req: Request, res: Response): Promise<Response> => {

    if (!req.params.username) {
        res.status(400).send('FALTA CONTENIDO EN EL CUERPO');
        return
    }

    console.log('username recibido:' + req.params.username);

    try {
        const response: QueryResult = await pool.query(`SELECT * FROM users WHERE username LIKE '${req.params.username}'`);
        if (res.json(response.rowCount > 0)) {
             // return true
             return res.status(200);
        }      
    }
    catch (e) {
        console.log(e);
        res.status(500).json('error al buscar el username');
    }
}

export const existeUserEmail = async (req: Request, res: Response): Promise<Response> => {

    if (!req.params.email) {
        res.status(400).send('FALTA CONTENIDO EN EL CUERPO');
        return
    }

    console.log('email recibido:' + req.params.email);

    try {
        const response: QueryResult = await pool.query(`SELECT * FROM users WHERE email LIKE '%${req.params.email}%'`);
        if (res.json(response.rowCount > 0)) {
             // si existe email return true
             return res.status(200);
        }      
    }
    catch (e) {
        console.log(e);
        res.status(500).json('error al buscar el email de usuario');
    }
}

export const getUserByUserName = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query(`SELECT * FROM users WHERE username = '${req.params.username}'`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('error al buscar el usuario por username');
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, surname, birthdate, email, pass, adress, state, username } = (req.body);
    await pool.query('UPDATE users set name = $1, surname = $2, birthdate = $3, email = $4, pass = $5, adress = $6, state = $7 WHERE username = $8', [name, surname, birthdate, email, pass, adress, state, username]); 
    return res.json(`El usuario ${req.params.username} ah sido actualizado exitosamente!`)
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    await pool.query('DELETE FROM users WHERE username = $1', [req.params.username]);
    return res.json(`El usuario ${req.params.username} ah sido eliminado exitosamente!`);
}

