"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import express from 'express'
const router = express_1.Router();
//const app = express();
//const cors = require('cors'); // para que el server acepte peticiones de cualquier puerto ej 4200 de Angular
const mercadopago_controller_1 = require("../controllers/mercadopago.controller");
// router.get('/checkout', checkout);
router.post('/checkout', mercadopago_controller_1.checkout);
router.post('/prueba', mercadopago_controller_1.prueba);
exports.default = router;
