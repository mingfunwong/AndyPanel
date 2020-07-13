import express from "express";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/config";

const userRouter = express.Router();

userRouter.post("/login", async (request, response) => {

  const body = request.body;
  const { username, password } = body;
  const loginUsername = config.LOGIN_USERNAME;
  const loginPassword = config.LOGIN_PASSWORD;

  if (username !== loginUsername || password !== loginPassword) {
    throw Error("账号或密码错误");
  }

  const userForToken = {
    userId: loginUsername,
  };
  const token = jsonwebtoken.sign(userForToken, config.JWT_SECRET);

  response.json({
    token: token,
  });

});

export default userRouter;
