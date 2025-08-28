const { db } = require("../db/connect");

class Userstats {
  constructor({
    userstatsid,
    username,
    overallpercentage,
    geographycorrect,
    musiccorrect,
    historycorrect,
    spanishcorrect,
    totalquizzes,
    totaltime,
  }) {
    this.userstatsid = userstatsid;
    this.username = username;
    this.overallpercentage = Number(overallpercentage);
    this.geographycorrect = Number(geographycorrect);
    this.musiccorrect = Number(musiccorrect);
    this.historycorrect = Number(historycorrect);
    this.spanishcorrect = Number(spanishcorrect);
    this.totalquizzes = Number(totalquizzes);
    this.totaltime = Number(totaltime);
  }

  static async getUserStatsByUsername(username) {
    const response = await db.query(
      "SELECT * FROM userstats WHERE username = $1;",
      [username]
    );

    if (response.rows.length !== 1) {
      throw new Error("Unable to retrieve userstats.");
    }
    return new Userstats(response.rows[0]);
  }

  static async createNewUserStats({ username, userid }) {
    console.log({ username, userid });

    const existingUserStats = await db.query(
      "SELECT username FROM userstats WHERE username = $1",
      [username]
    );
    if (existingUserStats.rows.length > 0) {
      throw new Error("Userstats already exists");
    }

    const response = await db.query(
      `INSERT INTO userstats 
                (username, userid, overallpercentage, geographycorrect, musiccorrect, historycorrect, spanishcorrect, totalquizzes, totaltime) 
            VALUES ($1, $2, 0, 0, 0, 0, 0, 0, 0)
            RETURNING *;`,
      [username, userid]
    );

    return new Userstats(response.rows[0]);
  }

  async updateUserStats(data) {
    const {
      username,
      overallpercentage, // should directly overwrite
      geographycorrect = 0,
      musiccorrect = 0,
      historycorrect = 0,
      spanishcorrect = 0,
      totalquizzes = 0,
      totaltime = 0,
    } = data;

    const response = await db.query(
      `UPDATE userstats SET
      overallpercentage = $2,
      geographycorrect   = geographycorrect + $3,
      musiccorrect       = musiccorrect + $4,
      historycorrect     = historycorrect + $5,
      spanishcorrect     = spanishcorrect + $6,
      totalquizzes       = totalquizzes + $7,
      totaltime          = totaltime + $8
    WHERE username = $1
    RETURNING *;`,
      [
        username,
        overallpercentage,
        geographycorrect,
        musiccorrect,
        historycorrect,
        spanishcorrect,
        totalquizzes,
        totaltime,
      ]
    );

    if (response.rows.length !== 1) {
      throw new Error("Unable to update the userstats");
    }
    return new Userstats(response.rows[0]);
  }
}

module.exports = Userstats;
