import mysql from "mysql";

export const db = mysql.createConnection({
  host: "centerbeam.proxy.rlwy.net", // Host do Railway
  user: "root", // Usuário do Railway
  password: "JAIaYlZTjYwjjcApCguPRQmhQZvomLMb", // Senha do Railway
  database: "railway", // Nome do banco (Railway)
  port: 39776, // Porta específica do Railway
});
