import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { CategoryDTO } from "../dto/category.dto";
import { validate } from "class-validator";

export class CategoryMiddleware {
  constructor (
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  categoryValidator (req: Request, res: Response, next: NextFunction) {
    const { categoryName } = req.body

    const valid = new CategoryDTO()

    valid.categoryName = categoryName
    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.INTERNAL_SERVER_ERROR(res, err);
      } else {
        next();
      }
    });
  }
}
