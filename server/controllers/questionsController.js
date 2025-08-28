const Questions = require('../models/Questions')

async function show (req, res) {
    try {
        let id = req.params.id
        const question = await Questions.getOneById(id)
        res.status(200).json(question)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}

async function getBySubjectCat (req, res) {
    try {
        let subjectCat = req.params.subjectCat
        let questions

        if (subjectCat === 'RAN') {
            questions = await Questions.getRandomQuestions()
        } else {
            questions = await Questions.getBySubjectCat(subjectCat)
        }

        res.status(200).json(questions)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}

async function getByDifficulty (req, res) {
    try {
        let difficulty = req.params.difficulty
        const questions = await Questions.getByDifficulty(difficulty)
        res.status(200).json(questions)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = {
    show, 
    getBySubjectCat,
    getByDifficulty
}