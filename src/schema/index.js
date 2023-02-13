const { mergeSchemas } = require('@graphql-tools/schema');
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');

module.exports = mergeSchemas({
  typeDefs,
  resolvers,
});
