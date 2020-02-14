const axios = require('axios')
let local = 'http://localhost:3001'
const redis = require('../config/redis')

const typeDefs = `
    extend type Query {
        movies : [Movie]
        movie(_id: String) : Movie
    }

    extend type Mutation {
        createMovie(title: String, overview: String, poster_path: String, popularity: Int, tags: [String]) : Movie
        updateMovie( _id: String, title: String, overview: String, poster_path: String, popularity: Int, tags: [String]) : Movie
        deleteMovie(_id: String) : Movie
    }
        
    type Movie {
        _id: String
        title: String
        overview: String
        poster_path: String
        popularity: Float!
        tags: [String]
    }
`

const resolvers = {
    Query: {
        movies: async () => {
            const { data } = await axios.get(local)
            return data
        },
        movie: async (parent, args) => {
            const { data } = await axios.get(`${local}/${args._id}`)
            return data
        }
    },
    Mutation: {
        createMovie: async (parent, args) => {
            const { data } = await axios.post(local, { ...args })
            return data
        },
        updateMovie: async (parent, args) => {
            const { data } = await axios.put(`${local}/${args._id}`, { ...args })
            return data
        },
        deleteMovie: async (parent, args) => {
            const { data } = await axios.delete(`${local}/${args._id}`)
            return data
        }
    }
}

module.exports = {
    typeDefs, resolvers
}