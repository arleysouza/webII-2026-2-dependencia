FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN npm run build
#  remove as dependências de desenvolvimento (devDependencies) que já foram instaladas na pasta node_modules
RUN npm prune --omit=dev

FROM node:24-alpine AS runtime
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD ["node", "dist/main.js"]
