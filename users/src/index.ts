import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";

(async () => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const { url } = await startStandaloneServer(server, { listen: { port: 4001 } });
  console.log(`🚀 Users subgraph ready at ${url}`);
})();
