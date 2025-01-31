import jwt from "jsonwebtoken";

export const generateToken = (userId: number, email: string): string => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET_KEY!, // Chave secreta configurada no .env
    { expiresIn: '1h' } // Expira em 1 hora
  );
};