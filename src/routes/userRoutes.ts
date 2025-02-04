import { userController } from "../controllers/userController";
import { FastifyInstance } from "fastify";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users', userController.listUser);
  fastify.post('/signup', userController.createUser);
  fastify.post("/signin", userController.loginUser);
}
