const express = require('express')
const app = express()
const cors = require('cors')()
const routes = require('./routes')
const morgan = require('morgan')
const port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors)
app.use(morgan('dev'))

app.use(routes)

app.listen(port, () => console.log('lintening on port ' + port))