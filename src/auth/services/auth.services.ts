import { ConfigServer } from "../../config/config";
import { UserEntity } from "../../user/entities/user.entity";
import { UserService } from "../../user/services/user.service";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { PayloadToken } from "../interfaces/auth.interfaces";

export class AuthService extends ConfigServer {
  constructor (
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
  ) {
    super()
  }

  public async validateUser (
    username: string,
    password: string
  ): Promise <UserEntity | null> {
    const userByEmail = await this.userService.findByEmail(username)
    const userByUsername = await this.userService.findUserById(username)

    if (userByUsername) {
      const isMatch = await bcrypt.compare(password, userByUsername.password);
      if (isMatch) {
        return userByUsername;
      }
    }
    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password);
      if (isMatch) {
        return userByEmail;
      }
    }

    return null;
  }

  public async generateJWT (
    user: UserEntity
  ): Promise <{ accessToken: string; user: UserEntity }> {
    const userConsult = await this.userService.findUserWithRole(
      user.id,
      user.role
    )

    const payload: PayloadToken = {
      role: userConsult!.role,
      sub: userConsult!.id,
    }

    if (userConsult) {
      user.password = "Not permission"
    }

    return {
      accessToken: this.sing (payload, this.getEnviroment("JWT_SECRET")),
      user,
    }
  }
}
