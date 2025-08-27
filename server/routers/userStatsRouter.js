const { Router } = require('express')
const userStatsController = require('../controllers/userStatsController')
const authenticator = require('../middleware/authenticator')

const userStatsRouter = Router()

userStatsRouter.get('/:username', userStatsController.show)
userStatsRouter.post('/', userStatsController.create)
userStatsRouter.patch('/:username', authenticator, userStatsController.update)

//integrate in frontend with users table

//future implementation:
//delete route

module.exports = userStatsRouter