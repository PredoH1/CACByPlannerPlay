import mysql from "mysql2";

export const db = mysql.createPool({
  host: "centerbeam.proxy.rlwy.net",
  user: "root",
  password: "JAIaYlZTjYwjjcApCguPRQmhQZvomLMb",
  database: "railway",
  port: 39776,
});
