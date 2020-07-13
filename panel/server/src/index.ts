import "reflect-metadata";
import http from "http";
import app from "./app";
import config from "./config/config";
import logger from "./utils/logger";

const server = http.createServer(app);
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

