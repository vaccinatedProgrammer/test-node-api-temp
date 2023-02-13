const { ApolloServer } = require("apollo-server-express");
const { ENVIRONMENT, GRAPHQL_ENDPOINT_ROUTE } = require("../../../default-env");
const graphQLLogger = require("./graphql-logger");
const graphQLContext = require("./graphql-context");

const startApolloServer = async ({
  schema,
  app,
  path = GRAPHQL_ENDPOINT_ROUTE,
  introspection = ENVIRONMENT.toUpperCase() !== "PROD",
  playground = ENVIRONMENT.toUpperCase() !== "PROD",
  plugins = [graphQLLogger],
  dataSources = () => ({}),
  context = graphQLContext,
}) => {
  const apolloServer = new ApolloServer({
    schema,
    introspection,
    playground,
    plugins,
    dataSources,
    context,
    formatResponse: (response, requestContext) => ({
      ...response,
      extensions: {
        meta: {
          ...requestContext.context.meta,
        },
      },
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path });

  return app;
};

module.exports = startApolloServer;
