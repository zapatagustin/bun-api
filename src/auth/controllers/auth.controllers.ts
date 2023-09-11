import { HttpResponse } from "../../shared/response/http.response";
import { UserEntity } from "../../user/entities/user.entity";
import { AuthService } from "../services/auth.services";
import { Request, Response } from "express";

export class AuthController extends AuthService {
  constructor (
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {
    super()
  }

  async login (req: Request, res: Response) {
    try {
      const userEncode = req.user as UserEntity

      const encode = await this.generateJWT(userEncode)
      if (!encode) {
        return this.httpResponse.UNAUTORIZED(res, "UNAUTORIZED")
      }

      res.header("Content-Type", "application/json");
      res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 });
      res.write(JSON.stringify(encode));
      res.end();
    } catch (err) {
    console.error(err)
    return this.httpResponse.INTERNAL_SERVER_ERROR(res, err)
  } 
  }
}
