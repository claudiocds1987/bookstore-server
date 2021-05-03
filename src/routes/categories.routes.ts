import { Router } from "express";
const router = Router();

import {
  createCategory,
  updateCategory,
  existCategoryByName,
  getCategories,
  getCategoryById,
  getCategoryByName,
} from "../controllers/categories.controller";

router.post("/createCategory", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.get("/categories/name/:name", getCategoryByName);
router.get("/categories/exist/:name", existCategoryByName);
router.put("/categories/update/:id", updateCategory);

export default router;
