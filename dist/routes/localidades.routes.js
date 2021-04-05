"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// importacion de funciones del controlador provincias.controller
const localidades_controller_1 = require("../controllers/localidades.controller");
router.post('/localidad/create', localidades_controller_1.createLocalidad); // crear localiddad
exports.default = router;
