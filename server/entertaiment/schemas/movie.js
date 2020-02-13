const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const axios = require('axios')

const typeDefs = `
    extend type Query {
        movies : [Movie]
        movie : Movie
    }

    extend type Mutation {
        createMovie(title: String, overview: String, poster_path: String, popularity: Int, tags: [String]) : Movie
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
    },
    Mutation: {
        createMovie: async (parent, args) => {
            const { title, overview, poster_path, popularity, tags } = args
            const { data } = await axios.post('http://localhost:3001', { title, overview, poster_path, popularity, tags })
            return data
        }
    }
}

module.exports = {
    typeDefs, resolvers
}