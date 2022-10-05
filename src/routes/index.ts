import express, { Router, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { Logger } from "winston";

import metadataRouter from "./metadata";
import { LoggerGenerator } from "../common/logger";
import { CustomRequest } from "../common/interfaces/custom-express";


const router: Router = express.Router();

// Inject request-specific logger into request object for request log tracing
router.use((req: CustomRequest, res: Response, next: NextFunction) => {
  const customRequestId = uuid();
  const apiType = req.baseUrl;

  req.logger = <Logger>LoggerGenerator({ customRequestId, apiType });
  next();
});

// Specify route prefixes and routers
router.use("/collections", metadataRouter);


export default router;
