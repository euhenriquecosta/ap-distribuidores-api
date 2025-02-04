import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Captura o token do header Authorization
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer " e pega apenas o token

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Armazena os dados do usuário no request
    request.body = decoded;

  } catch (error) {
    return reply.status(401).send({ error: "Token inválido ou expirado" });
  }
}