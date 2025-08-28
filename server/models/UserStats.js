const db = require('../db/connect')

class Userstats {
    constructor({ userstatsid, username, overallpercentage, geographycorrect, musiccorrect, historycorrect, spanishcorrect, totalquizzes, totaltime }) {
        this.userstatsid = userstatsid
        this.username = username
        this.overallpercentage = overallpercentage
        this.geographycorrect = geographycorrect
        this.musiccorrect = musiccorrect
        this.historycorrect = historycorrect
        this.spanishcorrect = spanishcorrect
        this.totalquizzes = totalquizzes
        this.totaltime = totaltime
    }

    // static async getUserStatsById(id) {
        
    //     const response = await db.query('SELECT*  FROM userstats WHERE userid = ($1);', [id])

    //     if (response.rows.length != 1) {
    //         throw new Error("Unable to retrieve userstats.")
    //     } else {
    //         return new Userstats(response.rows[0])
    //     }
    // }

    static async getUserStatsByUsername(username) {
        
        const response = await db.query('SELECT*  FROM userstats WHERE username = ($1);', [username])

        if (response.rows.length != 1) {
            throw new Error("Unable to retrieve userstats.")
        } else {
            return new Userstats(response.rows[0])
        }
    }

    static async createNewUserStats(data) {
        const { username, userid } = data
        console.log(data);

        const existingUserStats = await db.query('SELECT username FROM userstats WHERE username = $1', [username])

        if (existingUserStats.rows.length === 0) {
            let response = await db.query(`INSERT INTO userstats 
                (username, userid, overallpercentage, geographycorrect, musiccorrect, historycorrect, spanishcorrect, totalquizzes, totaltime) 
                VALUES 
                ($1, $2, 0, 0, 0, 0, 0, 0, 0) RETURNING *;`, [username, userid])

            return new Userstats(response.rows[0])
        } else {
            throw new Error('Userstats already exists')
        }
        
    }

    async updateUserStats(data) {
        const { username, overallpercentage, geographycorrect, musiccorrect, historycorrect, spanishcorrect, totalquizzes, totaltime} = data

        const response = await db.query(`UPDATE userstats SET
            overallpercentage = COALESCE($2, overallpercentage),
            geographycorrect   = geographycorrect + COALESCE($3, 0),
            musiccorrect       = musiccorrect + COALESCE($4, 0),
            historycorrect     = historycorrect + COALESCE($5, 0),
            spanishcorrect     = spanishcorrect + COALESCE($6, 0),
            totalquizzes       = totalquizzes + COALESCE($7, 0),
            totaltime          = totaltime + COALESCE($8, 0)
        WHERE username = $1
        RETURNING *;`, [username, overallpercentage, geographycorrect, musiccorrect, historycorrect, spanishcorrect, totalquizzes, totaltime])
        
        if (response.rows.length !== 1) {
            throw new Error('Unable to update the userstats')
        } else {
            return new Userstats(response.rows[0])
        }
    }
}

module.exports = Userstats