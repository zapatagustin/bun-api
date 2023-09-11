import * as dotenv from "dotenv"
import { DataSource } from "typeorm"
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    })
  }

  public getEnviroment(k: string): string | undefined {
    return process.env[k]
  }

  public getNumberEnv(k: string): number {
    return Number(this.getEnviroment(k))
  }

  public get nodeEnv(): string {
    return this.getEnviroment("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ["env"]

    if (path.length > 0) {
      const stringToArray = path.split(".")
      arrEnv.unshift(...stringToArray)
    }
    return "." + arrEnv.join(".")
  }

  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize()
  }
}
