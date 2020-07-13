import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const LOGIN_USERNAME = process.env.LOGIN_USERNAME;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

export default {
  PORT
  , JWT_SECRET
  , LOGIN_USERNAME
  , LOGIN_PASSWORD
  , MYSQL_HOST
  , MYSQL_USERNAME
  , MYSQL_PASSWORD
};
