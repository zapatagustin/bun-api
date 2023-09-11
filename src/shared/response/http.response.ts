import { Response } from "express"

export enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500
}

export class HttpResponse {
  Ok(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: "Success",
      data: data,
    })
  }

  NotFound(res: Response, data?: any): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: "Not found",
      error: data,
    })
  }

  UNAUTORIZED(res: Response, data?: any): Response {
    return res.status(HttpStatus.UNAUTORIZED).json({
      status: HttpStatus.UNAUTORIZED,
      statusMsg: "UNAUTORIZED",
      error: data,
    })
  }


  FORBIDDEN(res: Response, data?: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: "FORBIDDEN",
      error: data,
    })
  }

  INTERNAL_SERVER_ERROR(res: Response, data?: any): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: "INTERNAL_SERVER_ERROR",
      error: data,
    })
  }
}
