import { Router } from "express";
const router = Router();

import {
  existEditorialByName,
  createEditorial,
  updateEditorial,
  getEditorialByName,
  getEditorials,
  getEditorialById,
} from "../controllers/editorials.controller";

router.post("/createEditorial", createEditorial);
router.get("/editorials", getEditorials);
router.get("/editorials/:id", getEditorialById);
router.get("/editorials/exist/:name", existEditorialByName);
router.get("/editorials/name/:name", getEditorialByName);
router.put("/editorials/update/:id", updateEditorial);

export default router;
