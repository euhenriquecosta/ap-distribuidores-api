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
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export const distributorController = {
  findNearbyDistributors: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Garante que body existe e extrai os valores com fallback vazio
      const body = request.body as { coordinates?: { latitude: number, longitude: number }, range?: number } || {};
  
      // Verifica se os campos obrigatórios estão presentes
      if (!body.coordinates || !body.range) {
        return reply.status(400).send({ error: "Coloque no corpo da requisição latitude, longitude e range. Eles são obrigatórios!" });
      }
  
      const { latitude, longitude } = body.coordinates;
  
      // Chama o serviço para buscar distribuidores
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
        return reply.status(400).send({ error: 'Token de autenticação não informado!' });
      }

      if (!file) {
        return reply.status(400).send({ error: 'Nenhum arquivo enviado!' });
      }

      // Diretório que o arquivo será salvo
      const uploadDir = path.join(process.cwd(), "uploads/distributor/avatar");
      console.log("Caminho do diretório de upload:", uploadDir);
      
      if (!fs.existsSync(uploadDir)) {
        console.log("Criando diretório...");
        fs.mkdirSync(uploadDir, { recursive: true });
      }

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
      
      // Nome do arquivo
      const fileName = `${distributorId}.png`;
      // Caminho do arquivo
      const filePath = path.join(uploadDir, fileName);

      // Cria um stream para salvar o arquivo
      const fileStream = fs.createWriteStream(filePath);

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

      // Atualiza o avatar do usuário no banco de dados
      updateDistributorPhotoService(distributorId, filePath);

      reply.status(200).send({ message, path: filePath, filename: fileName });
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