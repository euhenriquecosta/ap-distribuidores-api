# Estágio de construção
FROM node:18-alpine AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma

# Instalar dependências (incluindo Prisma)
RUN npm install

# Copiar o restante do código-fonte
COPY . .

# Compilar o código TypeScript
RUN npm run build

# Estágio de produção
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma

# Instalar apenas dependências de produção
RUN npm install --only=production

# Copiar arquivos compilados do estágio de construção
COPY --from=build /app/dist ./dist

# Copiar arquivos do Prisma
COPY --from=build /app/prisma ./prisma

# Gerar o cliente do Prisma e rodar as migrações antes de iniciar
RUN npx prisma generate

# Comando de inicialização ajustado para rodar as migrações antes de iniciar a aplicação
CMD npx prisma migrate deploy && npm start

# Expõe a porta da aplicação
EXPOSE 3333