const axios = require('axios')
let local = 'http://localhost:3002'

const typeDefs = `
    extend type Query {
        series : [Series]
        seri : Series
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
            const { data } = await axios.get('http://localhost:3002')
            return data
        },
        seri: async (parent, args) => {
            const { data } = await axios.get('http://localhost:3002/' + args.id)
            return data
        }
    },
    Mutation: {
        createSeries: async (parent, args) => {
            const { data } = await axios.post(local, { ...args })
            return data
        },
        updateSeries: async (parent, args) => {
            const { data } = await axios.put(`${local}/${args._id}`, { ...args })
            return data
        },
        deleteSeries: async (parent, args) => {
            const { data } = await axios.delete(`${local}/${args._id}`)
            return data
        }
    }
}

module.exports = {
    typeDefs, resolvers
}