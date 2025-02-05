import { 
  createDistributorsService, 
  deleteDistributorService, 
  findDistributorService, 
  listDistributorsService, 
  updateDistributorsService
} from "../services/distributorsServices";
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
      const { DISTRIBUTOR_ID } = await createDistributorsService(request.body as IDistributor);
      reply.status(201).send({ id: DISTRIBUTOR_ID, message: "Distribuidor criado com sucesso!" });
    } catch (error) {
      console.error("Erro criando o distribuidor:", error);
      reply.status(500).send({ message: "Erro ao criar o distribuidor!" });
    }
  },
  deleteDistributor: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const distributorId = id;

      const distributor = await findDistributorService(distributorId);

      if (!distributor) {
        return reply.status(404).send({ error: "Distribuidor não encontrado!" });
      }

      await deleteDistributorService(distributorId);
      reply.status(200).send({ message: "Distribuidor deletado com sucesso!" });
    } catch (error) {
      console.error("Error deleting distributor:", error);
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
  },
  editDistributor: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const distributorId = id;

      const distributor = await findDistributorService(distributorId);

      if (!distributor) {
        return reply.status(404).send({ error: "Distribuidor não encontrado!" });
      }

      const updatedDistributor = await updateDistributorsService(distributorId, request.body as IDistributor);
      reply.status(200).send(updatedDistributor);
    } catch (error) {
      console.error("Error updating distributor:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
};