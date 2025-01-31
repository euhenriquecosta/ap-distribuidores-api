import { createDistributorsService, listDistributorsService } from "@/services/distributorsServices";
import { FastifyRequest, FastifyReply } from "fastify";
import { IDistributor } from "../interfaces/distributorInterface";

export const distributorController = {
  listDistributors: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const distributors = await listDistributorsService()
      reply.status(200).send(distributors);
    } catch (error) {
      console.error('Error listing distributors:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  },
  createDistributors: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const distributors = await createDistributorsService(request.body as IDistributor)
      reply.status(201).send(distributors);
    } catch (error) {
      console.error('Error creating distributors:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}