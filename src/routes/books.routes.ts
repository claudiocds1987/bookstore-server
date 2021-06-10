import { Router } from "express";
const router = Router();
import express from "express";
// usando el middleware multer para subir archivos (desde consola npm install --save multer)
var multer = require("multer");
/* npm i uuid (generador de id para que en el caso de que dos usuarios suban una
imagen con el mismo nombre, no se borren o se pisen al grabarlas */
const uuid = require("uuid");
const app = express();
const cors = require("cors");
const path = require("path");
// validations
const validations = require('./../validations/general-validations');

import {
  bajaBook,
  altaBook,
  getAvailableBooksWithAuthorName,
  filterAvailableBooksByName,
  filterAvailableBooksByAuthor,
  filterBooksByName,
  filterBooksByAuthor,
  existBook,
  getBooksWithAuthorName,
  getBooks,
  createBook,
  updateBook,
  getOneBookWithAuthorName,
  getBookByID,
  getRealDataBook,
  getTotalBooks,
  filterAvailableBooks
} from "../controllers/books.controller";

// ******************* PARA HACER UPLOAD DE IMAGE ******************* //
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    //carpeta donde va a guardar las imgs
    callBack(null, "public/uploads");
  },
  filename: (req, file, callBack) => {
    // uuid.v4() guarda la img con id aleatorio, para que no
    // se pisen imagenes en el caso que se suban con el mismo nombre
    callBack(
      null,
      uuid.v4() + path.extname(file.originalname).toLocaleLowerCase()
    );
  },
});

const upload = multer({
  storage,
  dest: "uploads/",

  limits: { fileSize: 2000000 }, //max permitido de image, 2 mega byte de peso
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // expresion regular
    // mimetype checkea si el archivo es valido ej img/extension del archivo
    const mimetype = fileTypes.test(file.mimetype);
    // path.extname checkea si la img tiene la extension .jpeg o .jpg o .gif o .png
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: el archivo debe ser una imagen valida");
    }
  },
}).single("file");

router.route("/file").post(upload, (req, res, next) => {
  const file = (req as any).file;
  console.log(file);
  if (!file) {
    console.log("No se subió ninguna imagen");
  }
  res.send(file);
  var ruta = (req as any).file.path;
  console.log("ruta de imagen: " + ruta);
});

// ******************* FIN UPLOAD DE IMAGE ******************* //

router.get("/books/exist/:name/:id_author", existBook);
router.get("/books/:id", getBookByID);
router.get("/booksAuthorName", getBooksWithAuthorName);
router.get("/AvailableBooksWithAuthorName", getAvailableBooksWithAuthorName);
router.get("/books", getBooks);
router.get("/bookAuthorName/:id", getOneBookWithAuthorName);
router.get("/filterBooksByName/:name", filterBooksByName);
router.get("/filterAvailableBooksByName/:name", filterAvailableBooksByName);
router.get("/filterBooksByAuthor/:name", filterBooksByAuthor);
// get libros con state = true
router.get("/filterAvailableBooksByAuthor/:name", filterAvailableBooksByAuthor);
router.get("/getRealDataBook/:id", getRealDataBook);
router.get("/books/get/total", getTotalBooks);
router.post("/books", upload, validations.validate(validations.createBookValidation), createBook);
router.post("/books/filterAvailableBooks", filterAvailableBooks);
router.put("/books/:id", upload, updateBook);
router.put("/books/baja/:id", bajaBook);
router.put("/books/alta/:id", altaBook);


export default router;
