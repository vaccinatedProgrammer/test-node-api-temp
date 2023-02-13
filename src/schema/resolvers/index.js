const { mergeResolvers } = require('@graphql-tools/merge');

const findManyExample = {
  Query: {
    findManyExample: async (_parent, args, { dataSources }) => {
      // add code here to handle the query given the args
      return dataSources.example.getExample(args);
    },
  },
};

const updateExample = {
  Mutation: {
    updateExample: async (_parent, _args, _context) => {
      // add code here to handle the mutation given the args and return the updated entity
      return {};
    },
  },
};

const resolvers = [findManyExample, updateExample];

module.exports = mergeResolvers(resolvers);
