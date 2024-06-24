import UserTypes from "./Users";
import PostTypes from "./Posts";

const RootTypes = `#graphql
  type Query {
    _root: Boolean
  }

  type Mutation {
    _root: Boolean
  }
`;

const types = [RootTypes, UserTypes, PostTypes];

export default types;
