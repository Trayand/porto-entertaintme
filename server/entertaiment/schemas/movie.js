const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const axios = require('axios')

const typeDefs = `
    extend type Query {
        movies : [Movie]
        movie : Movie
    }
        
        type Movie {
            title: String
            overview: String
            poster_path: String
            popularity: Int
            tags: [String]
        }
`

const resolvers = {
    Query: {
        movies: async () => {
            const { data } = await axios.get('http://localhost:3001')
            return data
        },
        movie: async (parent, args) => {
            const { data } = await axios.get('http://localhost:3001/' + args.id)
            return data
        }
    }
}

module.exports = {
    typeDefs, resolvers
}