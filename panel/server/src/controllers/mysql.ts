import express from "express";
import { requireLogged } from "../utils/login";
import mysql from 'mysql';
import config from "../config/config";

const connection = mysql.createConnection({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USERNAME,
  password: config.MYSQL_PASSWORD
});
connection.connect();

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
    editMySQL(name, password)
    response.json({ type: "success", message: "修改 MySQL 成功" });
  } else {
    db.get("mysql")
      .push({ name, password, desc, createTime, updateTime })
      .write();
    addMySQL(name, password)
    response.json({ type: "success", message: "新增 MySQL 成功" });
  }
});

mysqlRouter.delete("/", async (request, response) => {
  requireLogged(request);
  const body = request.body;
  const { name } = body;
  if (db.get("mysql").remove({ name }).write()) {
    removeMySQL(name)
    response.json({ type: "success", message: "删除 MySQL 成功" });
  } else {
    throw Error("MySQL 不存在");
  }
});

export default mysqlRouter;

function addMySQL(name: string, password: string) {
  let sql;
  sql = `CREATE USER '${name}'@'%' IDENTIFIED BY '${password}';`;
  connection.query(sql);
  sql = `CREATE DATABASE IF NOT EXISTS \`${name}\`;`
  connection.query(sql);
  sql = `GRANT ALL PRIVILEGES ON \`${name}\`.* TO '${name}'@'%';`
  connection.query(sql);
}

function editMySQL(name: string, password: string) {
  const sql = `set password for '${name}'@'%' = '${password}';`
  connection.query(sql);
}

function removeMySQL(name: string) {
  let sql;
  sql = `REVOKE ALL PRIVILEGES ON \`${name}\`.* FROM '${name}'@'%';`;
  connection.query(sql);
  sql = `DROP USER '${name}'@'%';`;
  connection.query(sql);
}

