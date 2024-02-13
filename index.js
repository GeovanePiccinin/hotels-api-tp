import "./env.js";
import express from "express";
import cors from "cors";
import logger from "./config/logger.js";
import v1Router from "./api/v1/router.js";
import v2Router from "./api/v2/router.js";

global.logger = logger;

const app = express();
app.use(express.json());

/* ATIVIDADE 12 - HABILITE a política de CORS */
//app.use(cors());

/* ATIVIDADE 2 - HABILITE o header de content-type para as respostas da API */
/*
app.use(function (req, res, next) {
  res.contentType("application/json");
  next();
});
*/

app.use("/api/v1", v1Router);

/* ATIVIDADE 1 - REMOVA esta rota e a estrutura de pastas da v2 */
app.use("/api/v2", v2Router);

/* ATIVIDADE 3 - CORRIJA o middleware de tratamento de erros */
app.use((err, req, res, next) => {
  logger.error(
    `${err.statusCode} - ${err.message} - ${req.method} ${req.baseUrl}`
  );
  res.status(500).send("Something went wrong");
});

app.listen(3000, () => console.log("API Started!"));
