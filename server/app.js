const express = require('express')
const cors = require('cors')

const userRouter = require('./routers/userRouter')
const userStatsRouter = require('./routers/userStatsRouter')
const questionsRouter = require('./routers/questionsRouter')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/userstats', userStatsRouter)
app.use('/questions', questionsRouter)

module.exports = app