"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// importacion de funciones del controlador provincias.controller
const provincias_controller_1 = require("../controllers/provincias.controller");
router.post('/provincia/create', provincias_controller_1.createProvincia);
router.get('/provincia/provincias', provincias_controller_1.getProvincias);
exports.default = router;
