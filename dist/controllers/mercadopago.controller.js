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
exports.checkout = void 0;
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const bodyParser = require("body-parser");
mercadopago.configure({
    // el token es el de "produccion" que te da mercadopago, seria el token del vendedor el que recibe la plata.
    access_token: "APP_USR-6727410487429690-020719-843ab473f4a5a89f1c2d74b496b704cd-523979565",
});
exports.checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // obteniendo total de productos a comprar
    const totalProducts = parseInt(req.body.totalProducts);
    //  Creo un objeto "productos", cada atributo va a guardar la info de los body title, price y quantity.
    const productos = {
        titulo: req.body.title,
        precio: req.body.price,
        cantidad: req.body.quantity,
    };
    let items = []; // este array va a enviar a api mercadopago
    // Object.keys(req.body.title).length devuelve el lenght del req.body.title
    // es decir, si desde angular al input name=title le cargue 2 nombres de libros.
    // el Object.keys(req.body.title).length devuelve 2, pero si hay solo un titulo te devuelve
    // la cantidad de caracteres, ojo con eso.
    // devuelve la cant de body que hay en el request, siempre va a dar 4 porque en en formulario son 4 inputs (title, price, quantity, totalProducts)
    // const size = Object.keys(req.body).length;
    if (totalProducts === 1) {
        // si hay 1 solo producto
        items.push({
            title: req.body.title.toString(),
            unit_price: parseInt(req.body.price.toString()),
            quantity: parseInt(req.body.quantity.toString()),
        });
    }
    else {
        // si hay mas de 1 producto
        for (let i = 0; i < totalProducts; i++) {
            items.push({
                title: productos.titulo[i].toString(),
                unit_price: parseInt(productos.precio[i].toString()),
                quantity: parseInt(productos.cantidad[i].toString()),
            });
        }
    }
    try {
        // Crea un objeto de preferencia y cargo los productos
        let preference = {
            items,
            // dependiendo del estado de la compra, mercadopago va a hacer un redirect a estas urls.
            back_urls: {
                success: "https://bookstore-cds-frontend.herokuapp.com/purchase/successful-purchase",
                failure: "http://www.tu-sitio/failure",
                pending: "https://bookstore-cds-frontend.herokuapp.com/purchase/form-purchase",
            },
            auto_return: "approved",
        };
        mercadopago.preferences
            .create(preference)
            .then(function (response) {
            console.log(response.body);
            // redirije a pagina de mercadopago para realizar la compra
            res.redirect(response.body.init_point);
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
