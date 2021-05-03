"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const router = express_1.Router();
const app = express_2.default();
const cors = require('cors'); // para que el server acepte peticiones de cualquier puerto ej 4200 de Angular
const config = require('./../config');
app.use(cors(config.cors));
const api_controller_1 = require("../controllers/api.controller");
router.get('/api/placeholder', api_controller_1.getPlace);
exports.default = router;
