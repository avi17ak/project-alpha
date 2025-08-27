const db = require('../db/connect')

class Userstats {
    constructor({ userstatsid, userid, overallpercentage, geographycorrect, musiccorrect, historycorrect, spanishcorrect, totalquizzes, totaltime }) {
        this.userstatsid = userstatsid
        this.userid = userid
        this.overallpercentage = overallpercentage
        this.geographycorrect = geographycorrect
        this.musiccorrect = musiccorrect
        this.historycorrect = historycorrect
        this.spanishcorrect = spanishcorrect
        this.totalquizzes = totalquizzes
        this.totaltime = totaltime
    }

    static async getUserStatsById(id) {
        
        const response = await db.query('SELECT*  FROM userstats WHERE userid = ($1);', [id])

        if (response.rows.length != 1) {
            throw new Error("Unable to retrieve userstats.")
        } else {
            return new Userstats(response.rows[0])
        }
    }

    static async createNewUserStats(data) {
        const { userid } = data

        const existingUserStats = await db.query('SELECT userid FROM userstats WHERE userid = $1', [userid])

        if (existingUserStats.rows.length === 0) {
            let response = await db.query(`INSERT INTO userstats 
                (userid, overallpercentage, geographycorrect, musiccorrect, historycorrect, spanishcorrect, totalquizzes, totaltime) 
                VALUES 
                ($1, 0, 0, 0, 0, 0, 0, 0) RETURNING *;`, [userid])

            return new Userstats(response.rows[0])
        } else {
            throw new Error('Userstats already exists')
        }
        
    }
}

module.exports = Userstats