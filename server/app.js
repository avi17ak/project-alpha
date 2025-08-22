const express = require('express')
const cors = require('cors')

const miamyRouter = require('./routers/miamy')

const app = express()
app.use(express.json())
app.use(cors())

// app.use('/')

module.exports = app