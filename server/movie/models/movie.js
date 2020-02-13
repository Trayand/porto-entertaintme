const { Schema, model } = require('mongoose')

const movieSchema = new Schema({
    title: String,
    overview: String,
    poster_path: String,
    popularity: Number,
    tags: Array
})

const Movie = model('Movie', movieSchema)

export default Movie