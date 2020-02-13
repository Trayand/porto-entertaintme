const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.readAll)

router.get('/:id', Controller.readOne)

router.post('/', Controller.createMovie)

router.put('/:id', Controller.updateMovie)

router.delete('/:id', Controller.deleteMovie)

module.exports = router