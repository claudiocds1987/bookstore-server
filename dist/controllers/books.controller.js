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
exports.getTotalBooks = exports.altaBook = exports.bajaBook = exports.updateBook = exports.createBook = exports.existBook = exports.getRealDataBook = exports.getOneBookWithAuthorName = exports.getBookByID = exports.filterBooksByAuthor = exports.filterAvailableBooksByAuthor = exports.filterBooksByName = exports.filterAvailableBooks = exports.filterAvailableBooksByName = exports.getBooksWithAuthorName = exports.getAvailableBooksWithAuthorName = exports.getBooks = void 0;
// pool es la conexion a db tmb se puede llamar db en vez de pool
// en consola poner npm run dev (para iniciar el servidor?)
const database_1 = require("../database");
exports.getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query("SELECT * from books");
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
// trae solo los libros que tienen state = true (aptos para venta)
exports.getAvailableBooksWithAuthorName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query("SELECT books.description, books.id_author, books.id_category, books.id_editorial, books.quantity, books.state, books.year, books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.state = true");
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
// trae todo los libros sin importar su state = true o false
exports.getBooksWithAuthorName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query("SELECT books.description, books.id_author, books.id_category, books.id_editorial, books.quantity, books.state, books.year, books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author");
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
// trae solo los libros con state = true (aptos para venta)
exports.filterAvailableBooksByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.name) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO, falta el nombre para buscar el libro",
        });
    }
    try {
        const response = yield database_1.pool.query(`SELECT books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.state = true AND books.name iLIKE '%${req.params.name}%'`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("Error, no se pudo filtrar el libro por el nombre");
    }
});
// trae solo los libros con state = true (aptos para venta)
exports.filterAvailableBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { column, value } = req.body;
    console.log(column, value);
    const a = 'SELECT books.description, books.id_author, books.id_category, books.id_editorial,';
    const b = ' books.quantity, books.state, books.year, books.id_book, books.name, books.price,';
    const c = ' books.url_image, authors.name AS Autor';
    const d = ' FROM books';
    const e = ' INNER JOIN authors';
    const f = ' ON books.id_author = authors.id_author';
    const g = ' INNER JOIN editorials';
    const h = ' ON books.id_editorial = editorials.id_editorial';
    const i = ' WHERE books.state = true';
    let query = a + b + c + d + e + f + g + h + i;
    let aux = '';
    switch (column) {
        case 'title':
            aux = ` AND books.name iLIKE '%${value}%'`;
            query = query + aux;
            break;
        case 'author':
            aux = ` AND authors.name iLIKE '%${value}%'`;
            query = query + aux;
            break;
        case 'editorial':
            aux = ` AND editorials.name iLIKE '%${value}%'`;
            query = query + aux;
            break;
        case 'all':
            query = query;
            break;
        default:
    }
    try {
        const response = yield database_1.pool.query(query);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("Error, no se pudo filtrar el libro");
    }
});
// trae todos los libros filtrados por nombre sin importar su state
exports.filterBooksByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.name) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO, falta el nombre para buscar el libro",
        });
    }
    try {
        const response = yield database_1.pool.query(`SELECT books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.name iLIKE '%${req.params.name}%'`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("Error, no se pudo filtrar el libro por el nombre");
    }
});
exports.filterAvailableBooksByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.name) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO, falta el nombre para buscar el autor",
        });
    }
    try {
        const response = yield database_1.pool.query(`SELECT books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.state = true AND authors.name iLIKE '%${req.params.name}%'`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("Error, no se pudo filtrar el libro por nombre de autor");
    }
});
exports.filterBooksByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.name) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO, falta el nombre para buscar el autor",
        });
    }
    try {
        const response = yield database_1.pool.query(`SELECT books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE authors.name iLIKE '%${req.params.name}%'`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("Error, no se pudo filtrar el libro por nombre de autor");
    }
});
exports.getBookByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.pool.query("SELECT * FROM books WHERE id_book = $1", [id]);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Error, no se puede obtener el libro");
    }
});
exports.getOneBookWithAuthorName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.pool.query("SELECT books.id_book, books.name, books.year, books.id_category, books.id_editorial, books.description, books.quantity, books.price, books.url_image, books.state, authors.name as Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.id_book = $1", [id]);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("Error, no se puede obtener el libro con nombre de autor");
    }
});
// trae toda la data de book mas nombre de autor, nombre de editorial y nombre de categoria
exports.getRealDataBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO, falta el id de libro",
        });
    }
    try {
        const id = parseInt(req.params.id);
        const a = "SELECT books.id_book, books.id_author, books.id_editorial, books.id_category, books.name, books.year, books.description, books.quantity, books.price, books.url_image, books.state,";
        const b = ' authors.name AS "autor", categories.name AS "category", editorials.name AS "editorial"';
        const c = " FROM books INNER JOIN authors";
        const d = " ON authors.id_author = books.id_author INNER JOIN categories";
        const e = " ON categories.id_category = books.id_category INNER JOIN editorials";
        const f = " ON editorials.id_editorial = books.id_editorial";
        const query = a + b + c + d + e + f + " WHERE id_book = $1";
        const response = yield database_1.pool.query(query, [id]);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Error, no se puede obtener el libro");
    }
});
exports.existBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Nombre de el libro para evaluar si existe el libro: " +
        req.params.name +
        " idAuthor: " +
        req.params.id_author);
    if (!req.params.name || !req.params.id_author) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO, falta el nombre o id para buscar el libro",
        });
    }
    try {
        const idAut = parseInt(req.params.id_author);
        // iLIKE no distingue mayusculas y minusculas ej: "auto", "Auto" para iLIKE es la misma palabra.
        const response = yield database_1.pool.query(`SELECT * FROM books WHERE books.name iLIKE '${req.params.name}' AND books.id_author = $1`, [idAut]);
        if (res.json(response.rowCount > 0)) {
            // si existe devuelve true
            return res.status(200);
        }
        else {
            // devuelve false
            return res.status(400);
        }
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("error al buscar el libro por nombre e id de autor");
    }
});
exports.createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, year, id_author, id_category, id_editorial, description, quantity, price, url_image, state, } = req.body;
    console.log(name, year, id_author, id_category, id_editorial, description, quantity, price, url_image, state);
    // el id_book en la db es autonumerico no hace falta
    let book_year = parseInt(year);
    let id_aut = parseInt(id_author);
    let id_cat = parseInt(id_category);
    let id_edi = parseInt(id_editorial);
    let cantidad = parseInt(quantity);
    let precio = parseInt(price);
    const response = yield database_1.pool.query("INSERT INTO books (name, year, id_author, id_category, id_editorial, description, quantity, price, url_image, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [
        name,
        book_year,
        id_aut,
        id_cat,
        id_edi,
        description,
        cantidad,
        precio,
        url_image,
        state,
    ]);
    return res.json({
        message: "El libro ah sido creado exitosamente!",
        body: {
            books: {
                name,
            },
        },
    });
});
exports.updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, year, id_author, id_category, id_editorial, description, quantity, price, url_image, state, id_book, } = req.body;
    let idBook = parseInt(id_book);
    let book_year = parseInt(year);
    let id_aut = parseInt(id_author);
    let id_cat = parseInt(id_category);
    let id_edit = parseInt(id_editorial);
    let cantidad = parseInt(quantity);
    let precio = price;
    console.log(name, book_year, id_aut, id_cat, id_edit, description, cantidad, precio, url_image, state);
    yield database_1.pool.query("UPDATE books set name = $1, year = $2, id_author = $3, id_category = $4, id_editorial = $5, description = $6, quantity = $7, price = $8, url_image = $9, state = $10 WHERE id_book = $11", [
        name,
        book_year,
        id_aut,
        id_cat,
        id_edit,
        description,
        cantidad,
        precio,
        url_image,
        state,
        idBook,
    ]);
    return res.json({
        message: "El libro ah sido actualizado exitosamente!",
        body: {
            books: {
                name,
            },
        },
    });
});
exports.bajaBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO, falta el id de book",
        });
    }
    try {
        const idBook = parseInt(req.params.id);
        yield database_1.pool.query('UPDATE public.books SET state = false WHERE id_book = $1', [idBook]);
        return res.status(200).json(`El libro con id ${req.params.id} fue dado de baja exitosamente!`);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("error al intentar dar de baja el libro");
    }
});
exports.altaBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO, falta el id de book",
        });
    }
    try {
        const idBook = parseInt(req.params.id);
        yield database_1.pool.query('UPDATE public.books SET state = true WHERE id_book = $1', [idBook]);
        return res.status(200).json(`El libro con id ${req.params.id} fue dado de alta exitosamente!`);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("error al intentar dar de alta el libro");
    }
});
// NO FUNCIONA
exports.getTotalBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query("select count(books.id_book) as total from books");
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
