import express from "express";
import { requireLogged } from "../utils/login";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("../../config/ftp.json");
const db = low(adapter);
const ftpRouter = express.Router();
db.defaults({ ftp: [] }).write();

ftpRouter.get("/", async (request, response) => {
  requireLogged(request);
  response.json(db.get("ftp"));
});

ftpRouter.post("/", async (request, response) => {
  requireLogged(request);
  const body = request.body;
  const { name, password, path, desc } = body;
  const nowDate = new Date().toJSON();
  const createTime = nowDate;
  const updateTime = nowDate;
  if (db.get("ftp").find({ name }).size().value()) {
    db.get("ftp")
      .find({ name })
      .assign({ name, password, path, desc, updateTime })
      .write();
    response.json({ type: "success", message: "修改 FTP 成功" });
  } else {
    db.get("ftp")
      .push({ name, password, path, desc, createTime, updateTime })
      .write();
    response.json({ type: "success", message: "新增 FTP 成功" });
  }
});

ftpRouter.delete("/", async (request, response) => {
  requireLogged(request);
  const body = request.body;
  const { name } = body;
  if (db.get("ftp").remove({ name }).write()) {
    response.json({ type: "success", message: "删除 FTP 成功" });
  } else {
    response.json({ type: "error", message: " FTP 不存在" });
  }
});

export default ftpRouter;
