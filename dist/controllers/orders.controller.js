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
exports.getOrdersByUserId = exports.getLastIdOrder = exports.createOrder = void 0;
const database_1 = require("../database");
exports.createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id_user || !req.body.adress || !req.body.phone_number || !req.body.total_price || !req.body.provincia || !req.body.localidad || !req.body.order_date) {
        res.status(400).send('FALTA CONTENIDO EN EL CUERPO');
    }
    const { id_user, adress, phone_number, total_price, provincia, localidad, order_date } = (req.body);
    console.log(id_user, adress, phone_number, total_price, provincia, localidad, order_date);
    // el id_order en la db es autonumerico no hace falta
    let idUser = parseInt(id_user);
    let totalPrice = total_price;
    const response = yield database_1.pool.query('INSERT INTO orders (id_user, adress, phone_number, total_price, provincia, localidad, order_date) VALUES ($1, $2, $3, $4, $5, $6, $7)', [idUser, adress, phone_number, totalPrice, provincia, localidad, order_date]);
    return res.json({
        message: 'La orden ah sido creado exitosamente!',
        body: {
            orders: {
                adress
            }
        }
    });
});
exports.getLastIdOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('select max(id_order) as "lastIdOrder" from orders');
        return res.status(200).json(response.rows[0]);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
exports.getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id_user) {
        res.status(400).send('FALTA CONTENIDO EN EL CUERPO');
    }
    try {
        const id = parseInt(req.params.id_user);
        const response = yield database_1.pool.query('SELECT * FROM orders WHERE orders.id_user = $1 order by order_date desc', [id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
