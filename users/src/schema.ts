import gql from "graphql-tag";

export const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }
`;
