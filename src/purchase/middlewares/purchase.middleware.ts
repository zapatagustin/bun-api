import { validate } from "class-validator";
import { SharedMiddleware } from "../../shared/middlewares/shared.middlewares";
import { NextFunction, Response, Request } from "express";
import { PurchaseDTO } from "../dto/purchase.dto";

export class PurchaseMiddleware extends SharedMiddleware {
  constructor() {
    super()
  }

  purchaseValidator(req: Request, res: Response, next: NextFunction) {
    const { status, paymentMethod, customer } = req.body;

    const valid = new PurchaseDTO();
    valid.status = status;
    valid.paymentMethod = paymentMethod;
    valid.customer = customer;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.INTERNAL_SERVER_ERROR(res, err);
      } else {
        next();
      }
    })
  }
}
