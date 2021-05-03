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
exports.getSaleDetail = exports.createSaleDetail = void 0;
const database_1 = require("../database");
exports.createSaleDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id_sale ||
        !req.body.id_book ||
        !req.body.quantity ||
        !req.body.price) {
        res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
    }
    const { id_sale, id_book, quantity, price } = req.body;
    console.log(id_sale, id_book, quantity, price);
    let idSale = parseInt(id_sale);
    let idBook = parseInt(id_book);
    let cantidad = parseInt(quantity);
    let precio = price;
    try {
        const response = yield database_1.pool.query("INSERT INTO sales_detail (id_sale, id_book, quantity, price) VALUES ($1, $2, $3, $4)", [idSale, idBook, cantidad, precio]);
        return res.json({
            message: "El detalle de venta ah sido creado exitosamente!",
            body: {
                orders: {
                    idSale,
                    idBook,
                    cantidad,
                    precio,
                },
            },
        });
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("Error, no se pudo insertar el detalle de venta en la base de datos");
    }
});
exports.getSaleDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id_sale) {
        res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
    }
    console.log(req.params.id_sale);
    let idSale = parseInt(req.params.id_sale);
    try {
        const response = yield database_1.pool.query("SELECT * FROM sales_detail where id_sale = $1", [idSale]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
