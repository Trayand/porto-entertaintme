const { ApolloServer, makeExecutableSchema } = require('apollo-server')

const movie = require('./schemas/movie')
const series = require('./schemas/series')

const typeDefs = `
    type Query
`

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, movie.typeDefs, series.typeDefs],
    resolvers: [movie.resolvers, series.resolvers]
})

const server = new ApolloServer({ schema })

server.listen()
    .then(({ url }) => console.log(`🚀  Server ready at ${url}`))