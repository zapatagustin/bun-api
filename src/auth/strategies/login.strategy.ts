import { UserEntity } from "../../user/entities/user.entity";
import { AuthService } from "../services/auth.services";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";

const authService: AuthService = new AuthService()

export class LoginStrategy {
  async validate (
    username: string,
    passport: string,
    done: any
  ): Promise <UserEntity> {
    const user = await authService.validateUser(username, password)
    
    if (!user) {
      return done(null, false, { message: "Invalid username or password"})
    }

    return done (null, user)
  }

  get use() {
    return PassportUse<LocalStrategy, Object, VerifyFunction> (
      "login",
      LocalStrategy,
      {
        usernameField: "username",
        passportField: "passport",
      },
      this.validate
    )
  }
}
