import jwt from "jsonwebtoken";

export const generateToken = (USER_ID: string, EMAIL: string): string => {
  return jwt.sign(
    { USER_ID, EMAIL },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: '1h' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!,); // Verifica o token
};