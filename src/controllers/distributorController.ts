import { 
  createDistributorsService, 
  deleteDistributorService, 
  findDistributorService, 
  findNearbyDistributorsService, 
  getDistributorAvatarService, 
  listDistributorsService, 
  updateDistributorPhotoService, 
  updateDistributorsService
} from "../services/distributorsServices";
import { FastifyRequest, FastifyReply } from "fastify";
import { IDistributor } from "../interfaces/distributorInterface";
import path from "path";
import fs from "fs";

export const distributorController = {
  findNearbyDistributors: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as { coordinates?: { latitude: number, longitude: number }, range?: number } || {};

      if (!body.coordinates || !body.range) {
        return reply.status(400).send({ error: "Coloque no corpo da requisição latitude, longitude e range. Eles são obrigatórios!" });
      }

      const { latitude, longitude } = body.coordinates;

      const nearbyDistributors = await findNearbyDistributorsService({ latitude, longitude }, body.range);

      reply.status(200).send(nearbyDistributors);
    } catch (error) {
      console.error("Error finding nearby distributors:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },

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

  uploadPhoto: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { file } = await request.file();
      const { id } = request.params as { id: string };
      const distributorId = id;

      if (!distributorId) {
        return reply.status(400).send({ error: 'ID do distribuidor não informado!' });
      }

      if (!file) {
        return reply.status(400).send({ error: 'Nenhum arquivo enviado!' });
      }

      // Caminho do diretório de upload
      const uploadDir = path.join(process.cwd(), "uploads/distributor/avatar");

      // Defina a URL base (isso pode ser dinâmico, dependendo do ambiente)
      const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN ? process.env.RAILWAY_PUBLIC_DOMAIN : 'http://localhost:3333'

      // Verifica se o diretório de upload existe, senão cria
      if (!fs.existsSync(uploadDir)) {
        console.log("Criando diretório...");
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Verifica se o distribuidor já tem uma foto
      const distributor = await getDistributorAvatarService(distributorId);
      let message = "Foto de perfil criada com sucesso!";

      if (distributor?.AVATAR) {
        const oldFilePath = distributor.AVATAR;

        // Remove o arquivo antigo se existir
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          message = "Foto de perfil alterada com sucesso!";
        }
      }

      // Nome do arquivo (usando o ID do distribuidor)
      const fileName = `${distributorId}.png`;
      // Caminho do arquivo final
      const filePath = path.join(uploadDir, fileName);

      // Cria um stream para salvar o arquivo
      const fileStream = fs.createWriteStream(filePath);

      
      // A URL pública do arquivo (que você vai salvar no banco de dados)
      const publicUrl = `${baseUrl}/uploads/distributor/avatar/${fileName}`;

      // Faz o upload do arquivo
      await new Promise<void>((resolve, reject) => {
        file.pipe(fileStream);
        file.on('end', () => {
          console.log("Upload de arquivo concluído.");
          resolve();
        });
        file.on('error', (err) => {
          console.error("Erro durante o upload do arquivo:", err);
          reject(err);
        });
      });

      // Atualiza o avatar do distribuidor no banco de dados
      await updateDistributorPhotoService(distributorId, publicUrl);

      // Retorna resposta ao usuário
      reply.status(200).send({ message, path: filePath, filename: fileName, url: publicUrl});
    } catch (error) {
      console.error('Error uploading photo:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
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
      const { id } = request.params as { id: string };
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