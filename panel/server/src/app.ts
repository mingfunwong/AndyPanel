import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import middleware from "./utils/middleware";
import userRouter from "./controllers/user";
import webRouter from "./controllers/web";
import mysqlRouter from "./controllers/mysql";
import ftpRouter from "./controllers/ftp";

const app = express();

app.use(express.static("public"));

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/user", userRouter);
app.use("/api/web", webRouter);
app.use("/api/mysql", mysqlRouter);
app.use("/api/ftp", ftpRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
