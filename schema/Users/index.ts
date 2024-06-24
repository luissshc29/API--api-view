const UserTypes = `#graphql
  extend type Query {
    getUser(filter: UserFilter!): User
    getUsers: [User!]!
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(filter: UserFilter!, data: EditUserInput!): User!
    deleteUser(filter: UserFilter!): User!
  }

  type User {
    id: Int!,
    firstName: String!,
    lastName: String!,
    userName: String!,
    indexRef: Int!,
    createdAt: String!,
    posts: [Post]!
  }

  input UserFilter {
    id: Int!
  }

  input EditUserInput {
    firstName: String,
    lastName: String,
    userName: String,
  }

  input CreateUserInput {
    firstName: String!,
    lastName: String!,
    userName: String!,
  }

`;

export default UserTypes;
