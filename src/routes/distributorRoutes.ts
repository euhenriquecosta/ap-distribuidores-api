import { FastifyInstance } from "fastify";
import { distributorController } from "@/controllers/distributorController";

export const distributorRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/distributors', distributorController.listDistributors);
  fastify.post('/distributors', distributorController.createDistributors);
}