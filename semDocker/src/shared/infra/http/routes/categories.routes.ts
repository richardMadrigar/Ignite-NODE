import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCateogoriesController } from "../../../../modules/cars/useCases/listCategories/ListCateogoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCateogoriesController = new ListCateogoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCateogoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
