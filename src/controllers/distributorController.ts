import { 
  createDistributorsService, 
  findDistributorService, 
  listDistributorsService 
} from "@/services/distributorsServices";
import { FastifyRequest, FastifyReply } from "fastify";
import { IDistributor } from "../interfaces/distributorInterface";

export const distributorController = {
  listDistributors: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const distributors = await listDistributorsService();
      reply.status(200).send(distributors);
    } catch (error) {
      console.error("Error listing distributors:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },

  createDistributors: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const distributors = await createDistributorsService(request.body as IDistributor);
      reply.status(201).send(distributors);
    } catch (error) {
      console.error("Error creating distributor:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },

  findDistributor: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string }; // params sempre retorna string
      const distributorId = id;

      const distributor = await findDistributorService(distributorId);

      if (!distributor) {
        return reply.status(404).send({ error: "Distribuidor não encontrado!" });
      }

      reply.status(200).send(distributor);
    } catch (error) {
      console.error("Error finding distributor:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
};