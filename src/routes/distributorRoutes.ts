import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/distribuitors', userController.listUser);
}