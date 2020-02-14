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
        for (const key in req.body) {
            if (!req.body[key] || key === '_id') {
                delete req.body[key]
            }
        }
        // console.log(req.body, 'ini');

        Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then((result) => {
                console.log(result);
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