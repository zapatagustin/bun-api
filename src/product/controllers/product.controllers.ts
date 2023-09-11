import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { ProductService } from "../services/product.services";
import { Request, Response } from "express";

export class ProductController {
  constructor (
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.findAllProducts();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "NO DATA");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findProductById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "NO DATA");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }

  async findProductsByName(req: Request, res: Response) {
    const { search } = req.query;
    try {
      if (search !== undefined) {
        const data = await this.productService.findProductsByName(search);
        if (!data) {
          return this.httpResponse.NotFound(res, "NO DATA");
        }
        return this.httpResponse.Ok(res, data);
      }
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const data = await this.productService.createProduct(req.body);
      if (!data) {
        return this.httpResponse.NotFound(res, "NO DATA");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.productService.updateProduct(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "ACT ERROR");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.productService.deleteProduct(id);
      res.status(200).json(data);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "ACT ERROR");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.INTERNAL_SERVER_ERROR(res, e);
    }
  }
}
