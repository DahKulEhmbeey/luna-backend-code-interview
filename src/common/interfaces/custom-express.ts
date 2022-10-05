import { Request } from "express";
import { Logger } from "winston";


// Specify added custom fields on HTTP Request object
interface CustomRequest extends Request {
  logger?: Logger,
  [key: string]: any
}


export {
  CustomRequest
}
