DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS userStats;

DROP TABLE IF EXISTS questions;

CREATE TABLE
    users (
        userId INT GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        PRIMARY KEY (userId)
    );

CREATE TABLE
    userStats (
        userStatsId INT GENERATED ALWAYS AS IDENTITY,
        userId INT,
        overallPct DECIMAL(4, 2) DEFAULT 0,
        geographyCorrect INT DEFAULT 0,
        musicCorrect INT DEFAULT 0,
        historyCorrect INT DEFAULT 0,
        spanishCorrect INT DEFAULT 0,
        totalQuizzes INT DEFAULT 0,
        totalTime INT DEFAULT 0,
        PRIMARY KEY (userStatsId),
        FOREIGN KEY (userId) REFERENCES users(userId)
    );

CREATE TABLE
    questions (
        questionId INT GENERATED ALWAYS AS IDENTITY,
        question VARCHAR(255) NOT NULL,
        answer VARCHAR(255) NOT NULL,
        optionOne VARCHAR(255) NOT NULL,
        optionTwo VARCHAR(255) NOT NULL,
        optionThree VARCHAR(255) NOT NULL,
        subjectCat VARCHAR(3) NOT NULL, --spa, geo, mus, his
        difficulty INT NOT NULL -- 1(easy), 2(mid), 3(hard)
    );