import Fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";
import dotenv from "dotenv";
import { distributorRoutes } from "./routes/distributorRoutes";
import cors from '@fastify/cors';

dotenv.config();

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || '0.0.0.0';

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL não definida! Verifique suas variáveis de ambiente.");
}

const server = Fastify({ logger: false });

server.register(userRoutes, { prefix: '/api' });
server.register(distributorRoutes, { prefix: '/api' });


server.register(cors, {
  origin: true, 
});

server.listen({port: Number(PORT), host: HOST}, (err: any, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`🚀 Server rodando em ${address}`); 
});