//importing dependencies
import express from "express";
import cors from "cors";
import router from "./routes.ts";

const app = express();

//middlewars
app.use(cors());
app.use(express.json());
app.use(router);

//listening port
app.listen(3000, () =>
  console.log("Servidor rodando na porta 3000. http://localhost:3000")
);
