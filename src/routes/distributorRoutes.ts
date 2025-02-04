import { FastifyInstance } from "fastify";
import { distributorController } from "../controllers/distributorController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const distributorRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/distributors", distributorController.listDistributors);
  fastify.get("/distributors/:id", distributorController.findDistributor);
  fastify.post("/distributors", { preHandler: authMiddleware }, distributorController.createDistributors);
};