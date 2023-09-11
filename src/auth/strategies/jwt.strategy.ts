import { validate } from "class-validator";
import { AuthService } from "../services/auth.services";
import { ExtractJwt, StrategyOptions } from "passport-jwt";
import { PayloadToken } from "../interfaces/auth.interfaces";

export class JwtStrategy extends AuthService {
  constructor () {
    super()
  }

async validate(payload: PayloadToken, done: any) {
  return done(null, payload)
}

get use() {
  return PassportUse<
    JwtStr,
    StrategyOptions,
    (payload: PayloadToken, done: any) => Promise<PayloadToken>
  > (
    "jwt",
    JwtStr,
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.getEnvironment("JWT_SECRET"),
        ignoreExpiration: false,
      },
      this.validate
  )
  }
}
