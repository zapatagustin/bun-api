import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middlewares";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";
import { validate } from "class-validator";

export class PurchaseProductMiddleware extends SharedMiddleware {
  constructor() {
    super()
  }

  PurchaseProductValidator(req: Request, res: Response, next: NextFunction) {
    const { quantityProduct, totalPrice, purchase, product } = req.body

    const valid = new PurchaseProductDTO()
    valid.quantityProduct = quantityProduct
    valid.totalPrice = totalPrice
    valid.purchase = purchase
    valid.product = product

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.INTERNAL_SERVER_ERROR(res, err)
      } else {
        next()
      }
    })
  }
}
