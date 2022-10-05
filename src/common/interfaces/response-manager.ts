interface ResponseData {
  error: boolean;
  message: string;
  data?: any;
  errorType?: string; // enum
}

interface ResponseMessage {
  statusCode: number;
  headers: { [header:string]: string } & { "Content-Type": string };
  data: ResponseData;
}

export {
  ResponseData,
  ResponseMessage
};
