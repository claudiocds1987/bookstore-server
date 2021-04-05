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
exports.createLocalidad = void 0;
// pool es la conexion a db tmb se puede llamar db en vez de pool
// en consola poner npm run dev (para iniciar el servidor?)
const database_1 = require("../database");
exports.createLocalidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check empty name
    if (!req.body.name) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO PARA PODER AGREGAR LA LOCALIDAD",
        });
    }
    // guardo en const name lo que llega en el request
    const { name } = req.body;
    if (name.length > 50)
        return res.status(400).send({
            message: "NO PUEDE TENER UN NOMBRE DE LOCALIDAD CON MAS DE 50 CARACTERES",
        });
    // insert en PostgreSQL
    const response = yield database_1.pool.query("INSERT INTO localidades (name) VALUES ($1)", [name]);
    return res.json({
        message: "La localidad ah sido creada exitosamente!",
        body: {
            localidad: {
                name,
            },
        },
    });
});
