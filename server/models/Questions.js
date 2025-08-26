const db = require('../db/connect')

class Questions {
    constructor({ questionid, question, answer, optionone, optiontwo, optionthree, subjectcat, difficulty }) {
        this.questionid = questionid
        this.question = question
        this.answer = answer
        this.optionone = optionone
        this.optiontwo = optiontwo
        this.optionthree = optionthree
        this.subjectcat = subjectcat
        this.difficulty = difficulty
    }

    static async getOneById(id) {
        const response = await db.query('SELECT * FROM questions WHERE questionId = ($1);', [id])
        if (response.rows.length != 1) {
            throw new Error("Unable to retrieve question.")
        } else {
            return new Questions(response.rows[0])
        }
    }

    static async getBySubjectCat(subjectcat, count = 10) {
        const { rows } = await db.query(`SELECT * FROM questions WHERE subjectcat = $1 ORDER BY random() LIMIT $2;`,[subjectcat, count]);
        if (rows.length == 0) {
            throw new Error("No questions found for this category.")
        } else {
            return rows.map(question => new Questions(question))
        }
    }

    static async getByDifficulty(difficulty, count = 10) {
        const { rows } = await db.query(`SELECT * FROM questions WHERE difficulty = $1 ORDER BY random() LIMIT $2;`,[difficulty, count]);
        if (rows.length == 0) {
            throw new Error("No questions found for this difficulty.")
        } else {
            return rows.map(question => new Questions(question))
        }
    }
}

module.exports = Questions