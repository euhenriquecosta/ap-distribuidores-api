import jwt from "jsonwebtoken";

export const generateToken = (USER_ID: string, EMAIL: string): string => {
  return jwt.sign(
    { USER_ID, EMAIL },
    process.env.JWT_SECRET_KEY!, // Chave secreta configurada no .env
    { expiresIn: '1h' } // Expira em 1 hora
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!,); // Verifica o token
  } catch (error) {
    return null;
  }
};