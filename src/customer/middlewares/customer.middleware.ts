import { NextFunction } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middlewares";
import { validate } from "class-validator";
import { CustomerDTO } from "../dto/customer.dto";

export class CustomerMiddleware extends SharedMiddleware {
  constructor() {
    super()
  }

  customerValidator(req: Request, res: Response, next: NextFunction) {
    const { adress, dni, user } = req.body

    const valid = new CustomerDTO()

    valid.adress = adress
    valid.dni = dni
    valid.user = user

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.INTERNAL_SERVER_ERROR(res, err)
      } else {
        next()
      }
    })
  }
}
