const { Schema, model } = require('mongoose')

const SeriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    // youtube: {
    //     type: String,
    //     required: true
    // },
    popularity: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length === 0 ? false : true
            },
            message: props => `${props.value} is empty!`
        }
    }
})

const Series = model('Series', SeriesSchema)

module.exports = Series