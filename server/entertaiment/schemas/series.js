const axios = require('axios')
let local = 'http://localhost:3002'
const redis = require('../config/redis')
const { ApolloError } = require('apollo-server')

const typeDefs = `
    extend type Query {
        series : [Series]
        seri(_id: String) : Series
    }
    
    extend type Mutation {
        createSeries(title: String, overview: String, poster_path: String, popularity: Int, tags: [String]) : Series
        updateSeries( _id: String, title: String, overview: String, poster_path: String, popularity: Int, tags: [String]) : Series
        deleteSeries(_id: String) : Series
    }

    type Series {
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
        series: async () => {
            try {
                const seriesCount = await redis.scard('seriesCount')
                if (seriesCount > 0) {
                    const series = await redis.hvals('series')
                    return series.map(JSON.parse)
                }

                const { data } = await axios.get('http://localhost:3002')
                series = data.reduce((acc, serie) => {
                    acc.push(serie._id, JSON.stringify(serie))
                    return acc
                }, [])

                redis.hset('series', ...series)
                redis.expire('series', 86400)

                redis.sadd('seriesCount', series.map(t => t._id))
                redis.expire('seriesCount', 86400)

                return data
            } catch (error) {
                throw new ApolloError('Something wrong when get all series')
            }
        },
        seri: async (parent, args) => {
            try {
                const serie = await redis.hget('series', args._id)
                if (serie) return JSON.parse(serie)

                const { data } = await axios.get('http://localhost:3002/' + args.id)

                redis.hset('series', args._id, JSON.stringify(data))
                redis.expire('series', args._id)

                const seriesCount = await redis.scard('seriesCount')
                if (seriesCount > 0) {
                    redis.sadd('seriesCount', data._id)
                    redis.expire('seriesCount', 86400)
                }

                return data
            } catch (error) {
                throw new ApolloError('Something wrong when get serie')
            }
        }
    },
    Mutation: {
        createSeries: async (parent, args) => {
            try {
                const { data } = await axios.post(local, { ...args })

                redis.hset('series', data._id, JSON.stringify(data))
                redis.expire('series', 86400)

                const seriesCount = await redis.scard('seriesCount')
                if (seriesCount > 0) {
                    redis.sadd('seriesCount', data._id)
                    redis.expire('seriesCount', 86400)
                }
                return data
            } catch (error) {
                throw new ApolloError('Something wrong when create serie')
            }
        },
        updateSeries: async (parent, args) => {
            try {
                const { data } = await axios.put(`${local}/${args._id}`, { ...args })

                redis.hset('series', args._id, JSON.stringify(data))
                redis.expire('series', 86400)

                redis.sadd('seriesCount', args._id)
                redis.expire('seriesCount', 86400)

                return data
            } catch (error) {
                throw new ApolloError('Something wrong when update serie')
            }
        },
        deleteSeries: async (parent, args) => {
            try {
                const { data } = await axios.delete(`${local}/${args._id}`)

                redis.hdel('series', args._id)
                redis.spop('seriesCount', args._id)

                return data
            } catch (error) {
                throw new ApolloError('Something wrong when delete serie')
            }
        }
    }
}

module.exports = {
    typeDefs, resolvers
}