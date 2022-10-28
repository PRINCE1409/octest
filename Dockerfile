FROM node:16 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM gcr.io/distroless/nodejs:16
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
USER 1000
CMD ["server.js"]
