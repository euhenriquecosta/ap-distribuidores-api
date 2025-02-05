import jwt from "jsonwebtoken";

interface TokenPayload {
  USER_ID: string;
  EMAIL: string;
  iat?: number;
  exp?: number;
}

export const generateToken = (USER_ID: string, EMAIL: string): string => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY não definida no ambiente!");
  }

  return jwt.sign({ USER_ID, EMAIL }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): TokenPayload => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY não definida no ambiente!");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expirado!");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Token inválido!");
    } else {
      throw new Error("Erro ao verificar o token.");
    }
  }
};