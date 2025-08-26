const Userstats = require('../models/UserStats')

async function show (req, res) {
    try {
        let id = req.params.id
        const userstats = await Userstats.getUserStatsById(id)
        res.status(200).json(userstats)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}

async function create(req, res) {
    try {
        const data = req.body
        console.log(req);
        const newUserStats = await Userstats.createNewUserStats(data)
        res.status(201).json(newUserStats)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    show,
    create
}