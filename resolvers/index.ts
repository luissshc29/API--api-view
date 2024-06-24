import postResolvers from "./Posts";
import userResolvers from "./Users";

const rootResolvers = {
  Query: {
    _root: () => {
      return true;
    },
  },
  Mutation: {
    _root: () => {
      return true;
    },
  },
};

const resolvers = [rootResolvers, userResolvers, postResolvers];
export default resolvers;
