const User = require('../models/User')
const Userstats = require('../models/UserStats')

async function show (req, res) {
    try {
        let username = req.params.username
        const userstats = await Userstats.getUserStatsByUsername(username)
        res.status(200).json(userstats)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}

async function create(req, res) {
    try {
        const data = req.body
        const newUserStats = await Userstats.createNewUserStats(data)
        res.status(201).json(newUserStats)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

async function update(req, res) {
    try {
        const username = req.params.username
        const data = req.body
        console.log(data);
        const userstats = await Userstats.getUserStatsByUsername(username)

        const result = await userstats.updateUserStats(data)

        res.status(200).json(result)

    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = {
    show,
    create,
    update
}