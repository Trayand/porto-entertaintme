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
            let moviesCount = await redis.scard('moviesCount')
            if (moviesCount > 0) {
                const movies = await redis.hvals('movies')
                return movies.map(JSON.parse)
            }

            const { data } = await axios.get(local)
            movies = data.reduce((acc, movie) => {
                acc.push(movie._id, JSON.stringify(movie))
                return acc
            }, [])

            redis.hset('movies', ...movies)
            redis.expire('movies', 86400)

            redis.sadd('moviesCount', ...data.map(t => t._id))
            redis.expire('moviesCount', 86400)

            return data
        },
        movie: async (parent, args) => {
            let movie = await redis.hget('movies', args._id)
            if (movie) return JSON.parse(movie)

            const { data } = await axios.get(`${local}/${args._id}`)

            redis.hset('movies', args._id, JSON.stringify(data))
            redis.expire('movies', 86400)

            return data
        }
    },
    Mutation: {
        createMovie: async (parent, args) => {
            const { data } = await axios.post(local, { ...args })

            redis.hset('movies', data._id, JSON.stringify(data))
            redis.expire('movies', 86400)

            const moviesCount = await redis.scard('moviesCount')
            if (moviesCount > 0) {
                redis.sadd('moviesCount', data._id)
                redis.expire('moviesCount', 86400)
            }

            return data
        },
        updateMovie: async (parent, args) => {
            const { data } = await axios.put(`${local}/${args._id}`, { ...args })

            redis.hset('movies', data._id, JSON.stringify(data))
            redis.expire('movies', 86400)

            redis.sadd('moviesCount', data._id)
            redis.expire('moviesCount', 86400)

            return data
        },
        deleteMovie: async (parent, args) => {
            const { data } = await axios.delete(`${local}/${args._id}`)

            redis.hdel('movies', args._id)
            redis.spop('moviesCount', args._id)

            return {
                data,
                message: `movie with id ${args._id} deleted`
            }
        }
    }
}

module.exports = {
    typeDefs, resolvers
}