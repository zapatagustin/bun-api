import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { CategoryService } from "../services/category.services";
import { Request, Response } from "express";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAllCategoties();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "NO DATA");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }
  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "NO DATA");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }

  async findCategoryWithProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryWithProduct(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "NO DATA");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.categoryService.updateCategory(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "ACT ERR");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }
  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.categoryService.deleteCategory(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "DELETE ERROR");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }
}
