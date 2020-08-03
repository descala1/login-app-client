const { ApolloServer, gql } = require('apollo-server');

const port = process.env.PORT ? process.env.PORT : 5000;

const typeDefs = gql`
    type Query {
        login(un: String, pw: String): String
    },

    type Mutation {
        register(name: String, un: String, email: String, pw: String): String
    }
`;

const resolvers = {
    Query: {
        login: (_, args) => {
            if(args.un == 'descalante' && args.pw == 'password123') return 'SUCCESS!';
            else return 'FAIL';
        }       
    },

    Mutation: {
        register: (_, args) => {
            console.log(args);
            return 'SUCCESS';
        }     
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port})
    .then((serverInfo) => { 
      console.log(`Server running at ${serverInfo.url}`);
    });