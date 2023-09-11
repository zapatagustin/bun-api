import "reflect-metadata"
import morgan from "morgan"
import cors from "cors"
import express from "express"
import { DataSource } from "typeorm"
import { ConfigServer } from "./config/config"
import { UserRouter } from "./user/user.router"
import { LoginStrategy } from "./auth/strategies/login.strategy"
import { JwtStrategy } from "./auth/strategies/jwt.strategy"
import { AuthRouter } from "./auth/auth.router"
import { CustomerRouter } from "./customer/customer.router"

class ServerBoostap extends ConfigServer {
  public app: express.Application = express()
  private port: number = this.getNumberEnv("PORT")

  constructor() {
    super()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.dbConnect()
    this.app.use(morgan("dev"))
    this.app.use(cors())
    this.passportUse()

    this.app.use(
      cors({
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
      })
    );

    this.app.use("/api", this.routers())
    this.listen()
  }

  routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new CustomerRouter().router,
      new AuthRouter().router,
    ]
  }

  passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use]
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
    .then(() => {
        console.log("Connection Success")
      })
    .catch((err) => {
        console.error(err)
      })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server is listening on port => " + this.port)
    })
  }
}

new ServerBoostap()
