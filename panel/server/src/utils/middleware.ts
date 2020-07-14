import logger from "./logger";
import jwt from "jsonwebtoken";
import config from "../config/config";


const requestLogger = (request: any, response: any, next: any) => {
  logger.info("Date:  ", new Date().toJSON());
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request: any, response: any) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error: any, request: any, response: any, next: any) => {
  logger.error(error.message);
  response.status(400).json({ error: error.message });
  next(error);
};

const tokenExtractor = (request: any, response: any, next: any) => {
  const auth = request.get("Authorization");
  let decodedToken: any;
  if (auth) {
    decodedToken = jwt.verify(auth, config.JWT_SECRET);
  }
  request.userId = decodedToken && decodedToken.userId ? decodedToken.userId : null;
  next();
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};