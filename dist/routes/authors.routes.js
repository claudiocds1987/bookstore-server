"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// router.get('/test', (req, res) => res.send('hello world'))
const authors_controller_1 = require("../controllers/authors.controller");
router.post('/authors/create', authors_controller_1.createAuthor);
router.get('/authors', authors_controller_1.getAuthors);
router.get('/authors/:id', authors_controller_1.getAuthorById);
router.get('/authors/exist/:name', authors_controller_1.existAuthorByName);
router.get('/authors/name/:name', authors_controller_1.getAuthorByName);
router.get('/authors/filter/:name', authors_controller_1.filterAuthorsByName);
router.put('/authors/update/:id', authors_controller_1.updateAuthor);
exports.default = router;
