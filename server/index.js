const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 8000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
