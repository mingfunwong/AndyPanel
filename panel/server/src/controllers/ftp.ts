import express from "express";
import { requireLogged } from "../utils/login";
import child_process from 'child_process'
import { add, remove } from "lodash";
const execSync = child_process.execSync;

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
    editFTP(name, password, path);
    response.json({ type: "success", message: "修改 FTP 成功" });
  } else {
    db.get("ftp")
      .push({ name, password, path, desc, createTime, updateTime })
      .write();
    addFTP(name, password, path);
    response.json({ type: "success", message: "新增 FTP 成功" });
  }
});

ftpRouter.delete("/", async (request, response) => {
  requireLogged(request);
  const body = request.body;
  const { name } = body;
  if (db.get("ftp").remove({ name }).write()) {
    remove(name);
    response.json({ type: "success", message: "删除 FTP 成功" });
  } else {
    throw Error("FTP 不存在");
  }
});

export default ftpRouter;

function addFTP(name: string, password: string, path: string) {
  execSync(`(echo ${password}; echo ${password}) | docker exec -i andypanel_ftpd_1 /usr/bin/pure-pw useradd ${name} -f /etc/pure-ftpd/passwd/pureftpd.passwd -m -d /www/${path} -u www-data -g www-data`);
}
function editFTP(name: string, password: string, path: string) {
  removeFTP(name);
  addFTP(name, password, path)
}
function removeFTP(name: string) {
  execSync(`docker exec -i andypanel_ftpd_1 /usr/bin/pure-pw userdel ${name} -f /etc/pure-ftpd/passwd/pureftpd.passwd -m`);
}