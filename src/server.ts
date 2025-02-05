import Fastify from "fastify";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static"
import cors from '@fastify/cors';

import { userRoutes } from "./routes/userRoutes";
import { distributorRoutes } from "./routes/distributorRoutes";

import dotenv from "dotenv";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || '3333';
const HOST = process.env.HOST || '0.0.0.0';
if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL não definida! Verifique suas variáveis de ambiente.");
}

const server = Fastify({ logger: false });


server.register(multipart)
server.register(userRoutes, { prefix: '/api' });
server.register(distributorRoutes, { prefix: '/api' });
server.register(fastifyStatic, {
  root: path.join(process.cwd(), 'uploads'),
  prefix: '/uploads/',
});

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