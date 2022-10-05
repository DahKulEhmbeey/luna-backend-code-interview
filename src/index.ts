import app from "./app";

import config from "./config";
import logger from "./common/logger";


app.listen(config.port, () => {
  logger.info(`App listening on port: ${config.port}`);
});

export default app;
