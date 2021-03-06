"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import express from 'express'
const router = express_1.Router();
const mercadopago_controller_1 = require("../controllers/mercadopago.controller");
router.post('/checkout', mercadopago_controller_1.checkout);
exports.default = router;
