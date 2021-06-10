"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const express_2 = __importDefault(require("express"));
// usando el middleware multer para subir archivos (desde consola npm install --save multer)
var multer = require("multer");
/* npm i uuid (generador de id para que en el caso de que dos usuarios suban una
imagen con el mismo nombre, no se borren o se pisen al grabarlas */
const uuid = require("uuid");
const app = express_2.default();
const cors = require("cors");
const path = require("path");
// validations
const validations = require('./../validations/general-validations');
const books_controller_1 = require("../controllers/books.controller");
// ******************* PARA HACER UPLOAD DE IMAGE ******************* //
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        //carpeta donde va a guardar las imgs
        callBack(null, "public/uploads");
    },
    filename: (req, file, callBack) => {
        // uuid.v4() guarda la img con id aleatorio, para que no
        // se pisen imagenes en el caso que se suban con el mismo nombre
        callBack(null, uuid.v4() + path.extname(file.originalname).toLocaleLowerCase());
    },
});
const upload = multer({
    storage,
    dest: "uploads/",
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/; // expresion regular
        // mimetype checkea si el archivo es valido ej img/extension del archivo
        const mimetype = fileTypes.test(file.mimetype);
        // path.extname checkea si la img tiene la extension .jpeg o .jpg o .gif o .png
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb("Error: el archivo debe ser una imagen valida");
        }
    },
}).single("file");
router.route("/file").post(upload, (req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        console.log("No se subió ninguna imagen");
    }
    res.send(file);
    var ruta = req.file.path;
    console.log("ruta de imagen: " + ruta);
});
// ******************* FIN UPLOAD DE IMAGE ******************* //
router.get("/books/exist/:name/:id_author", books_controller_1.existBook);
router.get("/books/:id", books_controller_1.getBookByID);
router.get("/booksAuthorName", books_controller_1.getBooksWithAuthorName);
router.get("/AvailableBooksWithAuthorName", books_controller_1.getAvailableBooksWithAuthorName);
router.get("/books", books_controller_1.getBooks);
router.get("/bookAuthorName/:id", books_controller_1.getOneBookWithAuthorName);
router.get("/filterBooksByName/:name", books_controller_1.filterBooksByName);
router.get("/filterAvailableBooksByName/:name", books_controller_1.filterAvailableBooksByName);
router.get("/filterBooksByAuthor/:name", books_controller_1.filterBooksByAuthor);
// get libros con state = true
router.get("/filterAvailableBooksByAuthor/:name", books_controller_1.filterAvailableBooksByAuthor);
router.get("/getRealDataBook/:id", books_controller_1.getRealDataBook);
router.get("/books/get/total", books_controller_1.getTotalBooks);
router.post("/books", upload, validations.validate(validations.createBookValidation), books_controller_1.createBook);
router.post("/books/filterAvailableBooks", books_controller_1.filterAvailableBooks);
router.put("/books/:id", upload, books_controller_1.updateBook);
router.put("/books/baja/:id", books_controller_1.bajaBook);
router.put("/books/alta/:id", books_controller_1.altaBook);
exports.default = router;
