# Estágio de construção
FROM node:20-alpine AS build 

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma

# Instalar dependências
RUN npm install --omit=dev

# Copiar o restante do código-fonte
COPY . .

# Compilar o código TypeScript
RUN npm run build

# Estágio de produção
FROM node:20-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma

# Instalar apenas dependências de produção
RUN npm install --omit=dev

# Copiar arquivos compilados do estágio de construção
COPY --from=build /app/dist ./dist

# Copiar arquivos do Prisma
COPY --from=build /app/prisma ./prisma

# Gerar o cliente do Prisma
RUN npx prisma generate

# Comando de inicialização ajustado para rodar as migrações antes de iniciar a aplicação
CMD npx prisma migrate deploy && npm start

# Expõe a porta da aplicação
EXPOSE 3333