//Importing dependencies
import express from "express";
import cors from "cors";
import router from "./auth/auth.routes.ts";

//Creating the server
const app = express();

//Middlewars
app.use(cors());
app.use(express.json());
app.use(router);

//Listening port
app.listen(3000, () =>
  console.log("Servidor rodando na porta 3000. http://localhost:3000")
);
