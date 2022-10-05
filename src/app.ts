import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";

// important: this sets up app config first
import config from "./config";
import router from "./routes";
import { INTERNAL_SERVER_ERROR, REQ_VALIDATION_FAILED } from "./common/helpers/response-manager";
import logger from "./common/logger";


const app: Application = express();

logger.info(`Node environment: ${config.env}`);

// Setup CORS (cross-origin resource sharing) settings
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", config.allowOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json());
app.set("port", config.port);
app.set("env", config.env);
app.use(morgan("dev"));
app.use(helmet());
app.disable("x-powered-by");


app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({message: "Metadata Server is still active"});
});

app.use("/api", router);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unexpected error: ", err);
  if (err && err.type === "entity.parse.failed") {
    return res.status(REQ_VALIDATION_FAILED.code).json({error: true, message: REQ_VALIDATION_FAILED.defaultMessage});
  }

  res.status(INTERNAL_SERVER_ERROR.code).json({error: true, message: INTERNAL_SERVER_ERROR.defaultMessage});
});


process.on("SIGINT", async () => {
  // Clean up before termination
  console.log("App terminated...");
  process.exit(0);
});


export default app;
