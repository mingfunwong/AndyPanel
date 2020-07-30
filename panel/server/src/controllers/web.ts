import express from "express";
import fs from "fs";
import _ from "lodash";
import { requireLogged } from "../utils/login";
import child_process from 'child_process'
const execSync = child_process.execSync;

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("../../config/web.json");
const db = low(adapter);
const webRouter = express.Router();
db.defaults({ web: [] }).write();

webRouter.get("/", async (request, response) => {
  requireLogged(request);
  response.json(db.get("web"));
});

webRouter.post("/", async (request, response) => {
  requireLogged(request);
  const body = request.body;
  const { name, alias, varsion, desc } = body;
  const nowDate = new Date().toJSON();
  const createTime = nowDate;
  const updateTime = nowDate;
  if (db.get("web").find({ name }).size().value()) {
    db.get("web")
      .find({ name })
      .assign({ name, alias, varsion, desc, updateTime })
      .write();
    saveVhost(name, alias);
    saveCaddyfile();
    createDir(name);
    restartDocker();
    response.json({ type: "success", message: "修改虚拟主机成功" });
  } else {
    db.get("web")
      .push({ name, alias, varsion, desc, createTime, updateTime })
      .write();
    saveVhost(name, alias);
    saveCaddyfile();
    createDir(name);
    restartDocker();
    response.json({ type: "success", message: "新增虚拟主机成功" });
  }
});

webRouter.delete("/", async (request, response) => {
  requireLogged(request);
  const body = request.body;
  const { name } = body;
  if (db.get("web").remove({ name }).write()) {
    removeVhost(name);
    saveCaddyfile();
    restartDocker();
    response.json({ type: "success", message: "删除虚拟主机成功" });
  } else {
    throw Error("虚拟主机不存在");
  }
});

export default webRouter;


function saveVhost(name: string, alias: string) {
  const data = `<VirtualHost *:80>
	DocumentRoot /var/www/${name}/public_html
  ServerName ${name}
  ServerAlias ${alias}
  ErrorLog \${APACHE_LOG_DIR}/error.log
  CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>`;
  fs.writeFileSync(`../../vhost/${name}.conf`, data);
}

function removeVhost(name: string) {
  fs.unlinkSync(`../../vhost/${name}.conf`);
}

function createDir(name: string) {
  const dir = `../../www/${name}`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.mkdirSync(`${dir}/public_html`);
    fs.writeFileSync(`${dir}/public_html/index.html`, `${name} working.`);
  }
}

function saveCaddyfile() {
  const varsionList = _.uniq(db.get("web").map('varsion').value())
  let data = '';
  varsionList.forEach((varsion: any, index: any) => {
    let domainList: string[] = []
    const alias = db.get("web").filter({ varsion }).map('alias').value()
    alias.forEach((item: string) => {
      domainList = domainList.concat(item.split(" "));
    });
    const domainString = domainList.map((item: string) => `${item}:80`).join(',\n');
    data += `${domainString} {
  proxy / http://${varsion}:80 {
    transparent
  }
  log / stdout
  log / /var/log/access.log "{combined}" {
    rotate_size 100
    rotate_compress
  }
}

`;
  })
  fs.writeFileSync(`../../caddyfile/Caddyfile`, data);
}

function restartDocker() {
  const varsionList = _.uniq(db.get("web").map('varsion').value().map((item: string) => `andypanel_${item}_1`)).join(" ")
  execSync(`docker restart ${varsionList} andypanel_caddy_1`);
}