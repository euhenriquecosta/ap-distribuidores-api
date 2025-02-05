import { FastifyRequest, FastifyReply } from "fastify";
import { createUserService, getUserByEmailService, getUserByIdService, listUserService, updateUserPhotoService } from "../services/userServices";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { CreateUserRequestBody } from "../interfaces/userInterface";
import fs from "fs";
import path from "path";
import { error } from "console";

interface LoginUserRequestBody {
  EMAIL: string;
  PASSWORD: string;
}

export const userController = {
  listUser: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await listUserService();
      reply.status(200).send(users);
    } catch (error) {
      console.error('Error listing users:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  },
  createUser: async (request: FastifyRequest<{ Body: CreateUserRequestBody }>, reply: FastifyReply) => {
    try {
      const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD } = request.body;
      
      await createUserService({ FIRST_NAME, LAST_NAME, EMAIL, PASSWORD });
      reply.status(201).send({
        message: "Usuário criado com sucesso!"
      });
    } catch (error) {
      console.error('Error creating user:', error);
      reply.status(500).send({ message: 'Erro ao criar o usuário!' });
    }
  },
  loginUser: async (request: FastifyRequest<{ Body: LoginUserRequestBody }>, reply: FastifyReply) => {
    try {
      const { EMAIL, PASSWORD } = request.body;

      // Busca o usuário no banco de dados
      const user = await getUserByEmailService(EMAIL);
      if (!user) {
        return reply.status(401).send({ error: 'Email ou senha inválidos!' });
      }

      // Verifica a senha
      const isPasswordValid = await bcrypt.compare(PASSWORD, user.PASSWORD);
      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'Email ou senha inválidos!' });
      }

      // Gera o token JWT
      const token = generateToken(user.USER_ID, user.EMAIL);

      // Retorna o token
      reply.status(200).send({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  },
  uploadPhoto: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { file } = await request.file()
      const id = request.user.id
      
      const userId = id

      if (!userId) {
        return reply.status(400).send({ error: 'Token de autenticação não informado!' });
      }

      if (!file) {
        return reply.status(400).send({ error: 'Nenhum arquivo enviado!' });
      }

      // Diretório que o arquivo será salvo
      const uploadDir = path.join(process.cwd(), "uploads/user/avatar");
      console.log(uploadDir)


      // Se o diretório não existir, ele é criado
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      // Caminho do arquivo
      const filePath = path.join(uploadDir, `${userId}.png`);

      // Cria um stream para salvar o arquivo
      const fileStream = fs.createWriteStream(filePath);

      await new Promise((resolve, reject) => {
        file.pipe(fileStream);
        file.on('end', resolve);
        file.on('error', reject);
      });

      // Atualiza o avatar do usuário no banco de dados
      updateUserPhotoService(userId, filePath).then(() => {
        reply.status(200).send({ message: 'Foto de perfil atualizada com sucesso!' });
      }).catch((error) => {
        reply.status(500).send({ error: 'Erro ao atualizar a foto de perfil!' });
      });

    } catch (error) {
      console.error('Error uploading photo:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}