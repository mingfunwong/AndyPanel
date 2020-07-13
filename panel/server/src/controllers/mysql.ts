import express from "express";
import { requireLogged } from "../utils/login";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("../../config/mysql.json");
const db = low(adapter);
const mysqlRouter = express.Router();
db.defaults({ mysql: [] }).write();

mysqlRouter.get("/", async (request, response) => {
  requireLogged(request);
  response.json(db.get("mysql"));
});

mysqlRouter.post("/", async (request, response) => {
  requireLogged(request);
  const body = request.body;
  const { name, password, desc } = body;
  const nowDate = new Date().toJSON();
  const createTime = nowDate;
  const updateTime = nowDate;
  if (db.get("mysql").find({ name }).size().value()) {
    db.get("mysql")
      .find({ name })
      .assign({ name, password, desc, updateTime })
      .write();
    response.json({ type: "success", message: "修改 MySQL 成功" });
  } else {
    db.get("mysql")
      .push({ name, password, desc, createTime, updateTime })
      .write();
    response.json({ type: "success", message: "新增 MySQL 成功" });
  }
});

mysqlRouter.delete("/", async (request, response) => {
  requireLogged(request);
  const body = request.body;
  const { name } = body;
  if (db.get("mysql").remove({ name }).write()) {
    response.json({ type: "success", message: "删除 MySQL 成功" });
  } else {
    response.json({ type: "error", message: " MySQL 不存在" });
  }
});

export default mysqlRouter;
