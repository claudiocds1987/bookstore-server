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
exports.getProvincias = exports.createProvincia = void 0;
const database_1 = require("../database");
exports.createProvincia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO PARA PODER AGREGAR LA PROVINCIA",
        });
    }
    const { name } = req.body;
    if (name.length > 50)
        return res.status(400).send({
            message: "NO PUEDE TENER UN NOMBRE DE PROVINCIA CON MAS DE 50 CARACTERES",
        });
    const response = yield database_1.pool.query("INSERT INTO provincias (name) VALUES ($1)", [name]);
    return res.json({
        message: "La provincia ah sido creada exitosamente!",
        body: {
            provincia: {
                name,
            },
        },
    });
});
exports.getProvincias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query("SELECT * from provincias");
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
