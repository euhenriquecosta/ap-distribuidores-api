import { FastifyInstance } from "fastify";
import { distributorController } from "../controllers/distributorController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const distributorRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/distributors", distributorController.listDistributors);
  fastify.get("/distributors/:id", distributorController.findDistributor);
  fastify.delete("/distributors/:id", { preHandler: authMiddleware }, distributorController.deleteDistributor);
  fastify.put("/distributors/:id", { preHandler: authMiddleware }, distributorController.editDistributor);
  fastify.post("/distributor/upload/avatar/:id", { preHandler: authMiddleware }, distributorController.uploadPhoto);
  fastify.post("/distributors", { preHandler: authMiddleware }, distributorController.createDistributors);
};