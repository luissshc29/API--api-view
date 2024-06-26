import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";

// ApolloServer setup
/* import { ApolloServer } from "apollo-server-micro"; */
import { ApolloServer } from "@apollo/server";
<<<<<<< HEAD
=======

// import { startStandaloneServer } from ("@apollo/server/standalone"
>>>>>>> 85b23869acb4203d7b3e2e015ba7d966cb19408a
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { PrismaClient } from "@prisma/client";

//Initial data source
import { data } from "./db";

// Prisma Client Setup
const prisma = new PrismaClient();
export default prisma;

// Inserting initial data on the database
/*
prisma.users
  .createMany({ data: data.users })
  .then((res) => console.log("Affected " + res + " lines"));
prisma.posts
  .createMany({ data: data.posts })
  .then((res) => console.log("Affected " + res + " lines"));
*/

// Express and Http Server setup
const app = express();
const httpServer = http.createServer(app);

// ApolloServer setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server
  .start()
  .then(() =>
    app.use(
      "/",
      cors({ origin: ["http://localhost:3000/"] }),
      express.json(),
      expressMiddleware(server)
    )
  )
  .then(() => {
    new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  });
