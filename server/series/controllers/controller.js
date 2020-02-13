const Series = require('../models/series')

class Controller {

    static readAll(req, res, next) {
        Series.find()
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static readOne(req, res, next) {
        Series.findById(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static createSeries(req, res, next) {
        Series.create(req.body)
            .then((result) => {
                res.status(201).json(result)
            }).catch(next);
    }

    static updateSeries(req, res, next) {
        // const { title, overview, poster_path, popularity, tags } = req.body

        Series.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static deleteSeries(req, res, next) {
        Series.findByIdAndDelete(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

}

module.exports = Controller