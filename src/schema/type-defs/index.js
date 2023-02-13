const { mergeTypeDefs } = require('@graphql-tools/merge');
const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    findManyExample(exampleString: String!): [Example]
  }
`;

const mutation = gql`
  type Mutation {
    updateExample(exampleString: String!): Example
  }
`;

const example = gql`
  type Example {
    id: Int
    exampleString: String
  }
`;

const typeDefs = [example, mutation, query];

module.exports = mergeTypeDefs(typeDefs);
