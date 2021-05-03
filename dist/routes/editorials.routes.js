"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const editorials_controller_1 = require("../controllers/editorials.controller");
router.post("/createEditorial", editorials_controller_1.createEditorial);
router.get("/editorials", editorials_controller_1.getEditorials);
router.get("/editorials/:id", editorials_controller_1.getEditorialById);
router.get("/editorials/exist/:name", editorials_controller_1.existEditorialByName);
router.get("/editorials/name/:name", editorials_controller_1.getEditorialByName);
router.put("/editorials/update/:id", editorials_controller_1.updateEditorial);
exports.default = router;
