import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../utils/jwt";

interface DecodedJWT {
  USER_ID: string;
  EMAIL: string;
  iat: number;
  exp: number;
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Captura o token do header Authorization
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer " e pega apenas o token

    const decoded = verifyToken(token) as DecodedJWT

    request.user = {
      id: decoded.USER_ID,
      email: decoded.EMAIL
    }
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return reply.status(401).send({ message: "Token inválido ou expirado" });
  }
}