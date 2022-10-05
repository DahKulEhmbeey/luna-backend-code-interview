import { Response } from "express";

import { ResponseData, ResponseMessage } from "../interfaces/response-manager";


export const REQ_OP_SUCCESSFUL = {
  code: 200,
  defaultMessage: ""
}

export const REQ_RESOURCE_CREATED = {
  code: 201,
  defaultMessage: ""
}

export const REQ_OP_QUEUED = {
  code: 202,
  defaultMessage: ""
}

export const SUCCESSFUL_NO_RESP = {
  code: 204,
  defaultMessage: ""
}

export const REQ_VALIDATION_FAILED = {
  code: 400,
  defaultMessage: "Invalid/incomplete input parameter(s)"
}

export const AUTH_CRED_MISSING = {
  code: 401,
  defaultMessage: "Required API credentials is/are missing"
}

export const AUTH_CRED_INVALID = {
  code: 401,
  defaultMessage: "Required API credentials is/are invalid"
}

export const ACCESS_UNAUTHORIZED = {
  code: 403,
  defaultMessage: "You do not have the necessary access level to read/write to this resource"
}

export const RESOURCE_NOT_FOUND = {
  code: 404,
  defaultMessage: ""
}

export const INTERNAL_SERVER_ERROR = {
  code: 500,
  defaultMessage: "An unexpected error occurred. Try again later"
}


// Prevent the status code definitions from being overwritten or deleted accidentally
const HTTPStatuses = [
  REQ_OP_SUCCESSFUL,
  REQ_RESOURCE_CREATED,
  REQ_OP_QUEUED,
  SUCCESSFUL_NO_RESP,
  REQ_VALIDATION_FAILED,
  AUTH_CRED_MISSING,
  AUTH_CRED_INVALID,
  ACCESS_UNAUTHORIZED,
  RESOURCE_NOT_FOUND,
  INTERNAL_SERVER_ERROR
];
HTTPStatuses.forEach(status => {
  Object.freeze(status);
});


class ResponseManager {
  public static respond (res: Response, message: ResponseMessage): Response | void {
    if (res.writableFinished || res.writableEnded) return;
    res.header(message.headers);
    return res.status(message.statusCode).json(message.data);
  }

  public static generateSuccessMessage (message?: string, data?: any, headers?: any): ResponseMessage {
    // status will always be 200. Fast helper for using default success message and 200 resp code
    // To use other success status codes, use the generic `generateMessage` to specify code and message or use default message 

    const res_data: ResponseData = {
      error: false,
      message: message || REQ_OP_SUCCESSFUL.defaultMessage,
    };
    if (data) res_data.data = data;

    return {
      statusCode: REQ_OP_SUCCESSFUL.code,
      headers: { "Content-Type": "application/json", ...(headers || {}) },
      data: res_data
    };
  }

  public static generateMessage (code: number, message: string, data?: any, headers?: any): ResponseMessage {
    const res_data: ResponseData = {
      error: code > 299 ? true : false, // http codes 3xx aren't in use
      message: message,
    };
    if (data) res_data.data = data;

    return {
      statusCode: code,
      headers: { "Content-Type": "application/json", ...(headers || {}) },
      data: res_data
    };
  }

  // add helper for setting various headers, like x-retry-after, x-daily-limit-exceeded, x-daily-limit-remaining, etc
};


// export error-type enum
export default ResponseManager;
