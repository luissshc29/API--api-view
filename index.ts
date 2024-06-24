import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";

// ApolloServer setup
import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { PrismaClient } from "@prisma/client";
import { data } from "./db";

// Prisma Client Setup
export const prisma = new PrismaClient();

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
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server
  .start()
  .then(() =>
    app.use(
      "/",
      cors<cors.CorsRequest>({ origin: ["http://localhost:3000"] }),
      express.json(),
      expressMiddleware(server)
    )
  )
  .then(() => httpServer.listen({ port: 4000 }));

// Server start v1

/*
server
  .start()
  .then(() => {
    app.application(
      "/",
      cors({
        origin: [
          " >>> COLOCAR NOVA URL <<< ",
          "http://localhost:3000",
        ],
      }),
      express.json(),
      expressMiddleware(server)
    );
  })
  .then(() => {
    new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  })
  .then(() => {
    console.log(`Server running at http://localhost:4000/`);
  });
*/

// Server Start v2
/*
startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
}).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
*/
