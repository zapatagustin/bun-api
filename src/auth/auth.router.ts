import { SharedMiddleware } from "../shared/middlewares/shared.middlewares";
import { BaseRouter } from "../shared/router/router";
import { AuthController } from "./controllers/auth.controllers";

export class AuthRouter extends BaseRouter <AuthController, SharedMiddleware> {
  constructor() {
    super (AuthController, SharedMiddleware)
  }

  routes(): void {
    this.router.post("/login", this.middleware.passAuth("login"), (req, res) =>
      this.controller.login(req, res)
    );
  }
}
