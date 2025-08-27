const { Router } = require('express')
const userStatsController = require('../controllers/userStatsController')

const userStatsRouter = Router()

userStatsRouter.get('/:id', userStatsController.show)
userStatsRouter.post('/', userStatsController.create)
userStatsRouter.patch('/:id', userStatsController.update)

//integrate in frontend with users table

//future implementation:
//delete route

module.exports = userStatsRouter