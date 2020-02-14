const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const axios = require('axios')

const typeDefs = `
extend type Query {
    series : [Series]
    seri : Series
}
    
    type Series {
        _id: String
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: [String]
    }
`

const resolvers = {
    Query: {
        series: async () => {
            const { data } = await axios.get('http://localhost:3002')
            return data
        },
        seri: async (parent, args) => {
            const { data } = await axios.get('http://localhost:3002/' + args.id)
            return data
        }
    }
}

module.exports = {
    typeDefs, resolvers
}