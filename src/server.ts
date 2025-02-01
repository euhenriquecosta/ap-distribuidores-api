import Fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";
import dotenv from "dotenv";
import { distributorRoutes } from "./routes/distributorRoutes";
import cors from '@fastify/cors';

dotenv.config();

const server = Fastify({ logger: false });

server.register(userRoutes, { prefix: '/api' });
server.register(distributorRoutes, { prefix: '/api' });


server.register(cors, {
  origin: true, 
});

server.listen({port: 3333}, (err: any, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server rodando em localhost:3333`); 
});