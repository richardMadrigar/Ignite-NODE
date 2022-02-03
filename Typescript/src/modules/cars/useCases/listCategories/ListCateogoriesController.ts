import { Response, Request } from "express";

import { ListCategoriesUseCase } from "./ListCateogiryUseCase";

class ListCateogoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listCategoriesUseCase.execute();

    return response.json(all);
  }
}

export { ListCateogoriesController };
