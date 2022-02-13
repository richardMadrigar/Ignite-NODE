import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCateogiryUseCase";
import { ListCateogoriesController } from "./ListCateogoriesController";

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

const listCateogoriesController = new ListCateogoriesController(
  listCategoriesUseCase
);

export { listCateogoriesController };
