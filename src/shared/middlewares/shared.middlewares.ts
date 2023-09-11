import { NextFunction } from "express";
import { HttpResponse } from "../response/http.response";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/dto/user.dto";
import passport from "passport";

export class SharedMiddleware {
  constructor (public httpResponse: HttpResponse = new HttpResponse()) {}
  passAuth(type: string) {
    return passport.authenticate(type, { session: false })
  }

   checkCustomerRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RoleType.CUSTOMER) {
      return this.httpResponse.UNAUTORIZED(res, "No tienes permiso");
    }
    return next();
  }
  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RoleType.ADMIN) {
      return this.httpResponse.UNAUTORIZED(res, "No tienes permiso");
    }
    return next();
  }
}
