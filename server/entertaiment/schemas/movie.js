const axios = require("axios");
let local = "http://54.254.202.17:4001";
const redis = require("../config/redis");
const { ApolloError } = require("apollo-server");

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
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        let moviesCount = await redis.scard("moviesCount");
        if (moviesCount > 0) {
          console.log(moviesCount, "- moviesCountHere");
          const movies = await redis.hvals("movies");
          return movies.map(JSON.parse);
        }

        const { data } = await axios.get(local);
        movies = data.reduce((acc, movie) => {
          acc.push(movie._id, JSON.stringify(movie));
          return acc;
        }, []);

        redis.hset("movies", ...movies);
        redis.expire("movies", 3600);

        redis.sadd("moviesCount", ...data.map((t) => t._id));
        redis.expire("moviesCount", 3600);

        return data;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    movie: async (parent, args) => {
      console.log(args);
      try {
        let movie = await redis.hget("movies", args._id);
        if (movie) return JSON.parse(movie);

        const { data } = await axios.get(`${local}/${args._id}`);

        if (data) {
          redis.hset("movies", args._id, JSON.stringify(data));
          redis.expire("movies", 3600);
        }

        return data;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    createMovie: async (parent, args) => {
      try {
        const { data } = await axios.post(local, { ...args });

        redis.hset("movies", data._id, JSON.stringify(data));
        redis.expire("movies", 3600);

        const moviesCount = await redis.scard("moviesCount");
        if (moviesCount > 0) {
          redis.sadd("moviesCount", data._id);
          redis.expire("moviesCount", 3600);
        }

        return data;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updateMovie: async (parent, args) => {
      try {
        const { data } = await axios.put(`${local}/${args._id}`, { ...args });

        redis.hset("movies", data._id, JSON.stringify(data));
        redis.expire("movies", 3600);

        redis.sadd("moviesCount", data._id);
        redis.expire("moviesCount", 3600);

        return data;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    deleteMovie: async (parent, args) => {
      try {
        const { data } = await axios.delete(`${local}/${args._id}`);

        redis.hdel("movies", args._id);
        redis.spop("moviesCount", args._id);

        return {
          data,
          message: `movie with id ${args._id} deleted`,
        };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
