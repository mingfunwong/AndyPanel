<template>
  <el-container>
    <el-main v-if="!token">
      <el-form
        :model="loginForm"
        ref="loginForm"
        label-width="50px"
        style="margin: 30vh auto 0 auto;width:300px"
      >
        <el-form-item>
          <h1 style="text-align: center">登录</h1>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="text-align:center">
            <el-button type="primary" @click="onLogin()">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-main>
    <el-main v-if="token">
      <h1>编辑虚拟主机</h1>
      <el-divider></el-divider>
      <h3>新增 / 修改</h3>
      <el-form :inline="true" :model="web">
        <el-form-item label="虚拟主机"></el-form-item>
        <el-form-item label="名字">
          <el-input v-model="web.name" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item label="绑定域名">
          <el-tooltip effect="dark" content="可以绑定多个域名，使用空格分割" placement="bottom">
            <el-input v-model="web.alias" placeholder="绑定域名"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="版本">
          <el-select v-model="web.varsion" placeholder="版本">
            <el-option label="PHP 5.7" value="php57"></el-option>
            <el-option label="PHP 7.4" value="php74"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="web.desc" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitWeb">保存</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="mysql">
        <el-form-item label="MySQL"></el-form-item>
        <el-form-item label="账号">
          <el-input v-model="mysql.name" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="mysql.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="mysql.desc" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitMySQL">保存</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="ftp">
        <el-form-item label="FTP"></el-form-item>
        <el-form-item label="账号">
          <el-input v-model="ftp.name" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="ftp.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-tooltip effect="dark" content="虚拟主机名字" placement="bottom">
            <el-input v-model="ftp.path" placeholder="路径"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="ftp.desc" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitFTP">保存</el-button>
        </el-form-item>
      </el-form>

      <h3>虚拟主机列表</h3>
      <el-table :data="webList" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="alias" label="绑定域名"></el-table-column>
        <el-table-column prop="varsion" label="版本"></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column prop="time" label="时间">
          <template slot-scope="scope">
            <small class="time">
              <div>
                创建时间：
                {{scope.row.createTime | formatDate}}
              </div>
              <div>
                更新时间：
                {{scope.row.updateTime | formatDate}}
              </div>
            </small>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="onEditWeb(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="onDeleteWeb(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3>MySQL 列表</h3>
      <el-table :data="mysqlList" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="账号"></el-table-column>
        <el-table-column prop="password" label="密码">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.password"
              show-password
              size="mini"
              style="max-width:150px"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column prop="time" label="时间">
          <template slot-scope="scope">
            <small class="time">
              <div>
                创建时间：
                {{scope.row.createTime | formatDate}}
              </div>
              <div>
                更新时间：
                {{scope.row.updateTime | formatDate}}
              </div>
            </small>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="onEditMySQL(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="onDeleteMySQL(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3>FTP 列表</h3>
      <el-table :data="ftpList" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="账号"></el-table-column>
        <el-table-column prop="password" label="密码">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.password"
              show-password
              size="mini"
              style="max-width:150px"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column prop="time" label="时间">
          <template slot-scope="scope">
            <small class="time">
              <div>
                创建时间：
                {{scope.row.createTime | formatDate}}
              </div>
              <div>
                更新时间：
                {{scope.row.updateTime | formatDate}}
              </div>
            </small>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="onEditFTP(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="onDeleteFTP(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import request from "./utils/request";
import globalData from "./utils/global_data";
import dayjs from "dayjs";

export default {
  name: "app",
  data() {
    return {
      token: "",
      loginForm: {
        username: "",
        password: ""
      },
      web: {
        name: "example",
        alias: "example.lvh.me",
        varsion: "php74",
        desc: "示例站点"
      },
      mysql: {
        name: "example",
        password: "example123",
        desc: "示例 MySQL"
      },
      ftp: {
        name: "example",
        password: "example123",
        path: "example",
        desc: "示例 FTP"
      },
      webList: [],
      mysqlList: [],
      ftpList: []
    };
  },
  async created() {
    const token = globalData.get("token");
    if (token) {
      this.token = token;
      this.getWebList();
      this.getMySQLList();
      this.getFTPList();
    }
  },
  methods: {
    async onLogin() {
      const { token } = await request.post("/api/user/login", this.loginForm);
      this.token = token;
      globalData.set("token", token);
      this.$message({
        type: "success",
        message: "登录成功"
      });
      this.getWebList();
      this.getMySQLList();
      this.getFTPList();
    },
    async getWebList() {
      const data = await request.get("/api/web");
      if ("object" === typeof data) {
        this.webList = data;
      }
    },
    async getMySQLList() {
      const data = await request.get("/api/mysql");
      if ("object" === typeof data) {
        this.mysqlList = data;
      }
    },
    async getFTPList() {
      const data = await request.get("/api/ftp");
      if ("object" === typeof data) {
        this.ftpList = data;
      }
    },
    async onSubmitWeb() {
      const message = await request.post("/api/web", this.web);
      if (message.type == "success") {
        this.getWebList();
      }
    },
    async onSubmitMySQL() {
      const message = await request.post("/api/mysql", this.mysql);
      if (message.type == "success") {
        this.getMySQLList();
      }
    },
    async onSubmitFTP() {
      const message = await request.post("/api/ftp", this.ftp);
      if (message.type == "success") {
        this.getFTPList();
      }
    },
    async onEditWeb(index, row) {
      this.web.name = row.name;
      this.web.alias = row.alias;
      this.web.varsion = row.varsion;
      this.web.desc = row.desc;
      scroll(0, 0);
    },
    async onEditMySQL(index, row) {
      this.mysql.name = row.name;
      this.mysql.password = row.password;
      this.mysql.desc = row.desc;
      scroll(0, 0);
    },
    async onEditFTP(index, row) {
      this.ftp.name = row.name;
      this.ftp.password = row.password;
      this.ftp.path = row.path;
      this.ftp.desc = row.desc;
      scroll(0, 0);
    },
    async onDeleteWeb(index, row) {
      this.$confirm("是否要删除所选域名？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const message = await request.delete("/api/web", row);
        if (message.type == "success") {
          this.getWebList();
        }
      });
    },
    async onDeleteMySQL(index, row) {
      this.$confirm("是否要删除所选 MySQL？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const message = await request.delete("/api/mysql", row);
        if (message.type == "success") {
          this.getMySQLList();
        }
      });
    },
    async onDeleteFTP(index, row) {
      this.$confirm("是否要删除所选 FTP？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const message = await request.delete("/api/ftp", row);
        if (message.type == "success") {
          this.getFTPList();
        }
      });
    }
  },
  filters: {
    formatDate(time) {
      return dayjs(time).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style>
h1,
h2,
h3 {
  font-weight: normal;
}
h1 {
  margin-top: 0.5em;
  font-size: 26px;
}
h3 {
  margin: 1.5em 0 0.5em 0;
}
.time {
  line-height: 1.35;
}
</style>
