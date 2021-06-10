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
// validations
const validations = require('./../validations/general-validations');
const auth_controller_1 = require("../controllers/auth.controller");
// la ruta en realidad es /api/auth/nombre fijarse en archivo server.ts en app.use('/api/auth/', authRoutes);
router.post('/api/auth/signup/user', validations.validate(validations.userSignUpValidation), auth_controller_1.signup);
router.post('/api/auth/signin/user', validations.validate(validations.userLoginValidation), auth_controller_1.signin);
exports.default = router;
