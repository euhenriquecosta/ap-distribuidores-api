import { FastifyRequest, FastifyReply } from "fastify";
import { createUserService, getUserByEmailService, listUserService } from "../services/userServices";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/jwt";
import { CreateUserRequestBody } from "@/interfaces/userInterface";


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
  }
}