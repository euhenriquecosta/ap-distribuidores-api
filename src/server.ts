import Fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";
import dotenv from "dotenv";
import { distributorRoutes } from "./routes/distributorRoutes";

dotenv.config();

const server = Fastify({ logger: true });

server.register(userRoutes, { prefix: '/api' });
server.register(distributorRoutes, { prefix: '/api' });


server.listen({port: 3333}, (err: any, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server rodando em localhost:3333`); 
});