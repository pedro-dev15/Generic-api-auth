import * as dotenv from 'dotenv';
import path from 'path';

// Isso garante que o Node encontre o arquivo .env independente de onde você chame o script
dotenv.config({
  path: path.resolve(import.meta.dirname, '../../.env'),
});

console.log(
  'Teste de leitura do Secret:',
  process.env.SECRET ? 'Lido com sucesso!' : 'Não encontrado',
);
