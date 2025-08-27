const { Router } = require('express')
const userStatsController = require('../controllers/userStatsController')

const userStatsRouter = Router()

userStatsRouter.get('/:id', userStatsController.show)
userStatsRouter.post('/', userStatsController.create)

//make update route
//integrate in frontend with users table

//future implementation:
//delete route

module.exports = userStatsRouter