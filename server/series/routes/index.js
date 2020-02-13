const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.readAll)

router.get('/:id', Controller.readOne)

router.post('/', Controller.createSeries)

router.put('/:id', Controller.updateSeries)

router.delete('/:id', Controller.deleteSeries)

module.exports = router