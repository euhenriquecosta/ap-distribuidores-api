import { FastifyRequest, FastifyReply } from "fastify";
import { createUserService, getUserByEmailService, listUserService } from "../services/userServices";
import { compare } from "bcrypt";
import { generateToken } from "@/utils/jwt";

interface CreateUserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginUserRequestBody {
  email: string;
  password: string;
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
      const { firstName, lastName, email, password } = request.body;
      const newUser = await createUserService({ firstName, lastName, email, password });
      reply.status(201).send(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  },
  loginUser: async (request: FastifyRequest<{ Body: LoginUserRequestBody }>, reply: FastifyReply) => {
    try {
      const { email, password } = request.body;

      // Busca o usuário no banco de dados
      const user = await getUserByEmailService(email);
      if (!user) {
        return reply.status(401).send({ error: 'Invalid email or password' });
      }

      // Verifica a senha
      const isPasswordValid = await compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return reply.status(401).send({ error: 'Invalid email or password' });
      }

      // Gera o token JWT
      const token = generateToken(user.id, user.email);

      // Retorna o token
      reply.status(200).send({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}