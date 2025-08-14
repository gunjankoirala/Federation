import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway } from "@apollo/gateway";

async function startGateway() {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: "users", url: "http://localhost:4001" },
      { name: "todos", url: "http://localhost:4002" },
    ],
  });

  const server = new ApolloServer({
    gateway,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      return { headers: req.headers };
    },
  });

  console.log(`🚀 Gateway ready at ${url}`);
}

startGateway();
