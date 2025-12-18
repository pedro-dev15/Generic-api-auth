//Test to get the environment variables
import * as dotenv from "dotenv";
import path from "path";

// This ensures that the Node finds the .env file regardless of where you call the script
dotenv.config({
  path: path.resolve(import.meta.dirname, "../../.env"),
});

console.log(
  "Teste de leitura do Secret:",
  process.env.SECRET ? "Lido com sucesso!" : "Não encontrado"
);
