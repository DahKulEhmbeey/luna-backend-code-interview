import winston from "winston";

import config from "../config";


const { format: { combine, colorize, label, timestamp, printf } } = winston;

const logger = ({ customRequestId, apiType }: any = {}): winston.Logger => {
  const consoleTransport = new (winston.transports.Console)({
    level: config.env === "development" ? "debug" : "info",
  });
  const transports = [consoleTransport];
  const logger = winston.createLogger({
    transports,
    format: combine(
      colorize(),
      label({ label: config.appName }),
      timestamp(),
      printf(({ level, message, label, timestamp, ...meta }) => {
        return `${timestamp} [${label}] ${apiType} ${customRequestId} ${level} || ${message} || ${meta ? JSON.stringify(meta) : ""}`;
      })
    )
  });

  return logger;
}


export { logger as LoggerGenerator };
export default logger({customRequestId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", apiType: "service"});
