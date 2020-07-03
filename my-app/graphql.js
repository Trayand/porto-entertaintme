import ApolloClient, { gql } from "apollo-boost";

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean
  }
  extend type Mutation {
    login: Boolean
  }
`;
const resolvers = {
  Mutation: {
    login: (parent, args, { cache }) => {
      cache.writeData({ data: { isLoggedIn: true } });
      return true;
    },
  },
};

const client = new ApolloClient({
  // uri: "http://192.168.43.117:4000/",
  uri: "http://172.31.36.154:4000/",
  resolvers,
  typeDefs,
});

client.writeData({ data: { isLoggedIn: false } });

export default client;
