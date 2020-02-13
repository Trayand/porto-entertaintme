const Movie = require('../models/movie')

class Controller {

    static readAll(req, res, next) {
        Movie.find()
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static readOne(req, res, next) {
        Movie.findById(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static createMovie(req, res, next) {
        Movie.create(req.body)
            .then((result) => {
                res.status(201).json(result)
            }).catch(next);
    }

    static updateMovie(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body

        Movie.findByIdAndUpdate(req.params.id, {
            title,
            overview,
            poster_path,
            popularity,
            tags
        }, { new: true })
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static deleteMovie(req, res, next) {
        Movie.findByIdAndDelete(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

}

module.exports = Controller