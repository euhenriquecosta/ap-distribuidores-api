import { authMiddleware } from "../middlewares/authMiddleware";
import { userController } from "../controllers/userController";
import { FastifyInstance } from "fastify";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users', userController.listUser);
  fastify.post('/signup', userController.createUser);
  fastify.post("/signin", userController.loginUser);
  fastify.post("user/upload/avatar", { preHandler: authMiddleware }, userController.uploadPhoto);
}