const { Router } = require('express')
const userStatsController = require('../controllers/userStatsController')

const userStatsRouter = Router()

userStatsRouter.get('/:id', userStatsController.show)
userStatsRouter.post('/', userStatsController.create)

module.exports = userStatsRouter