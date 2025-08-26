DROP TABLE IF EXISTS userStats CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE
    users (
        userid INT GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        PRIMARY KEY (userId)
    );

CREATE TABLE
    userStats (
        userstatsid INT GENERATED ALWAYS AS IDENTITY,
        userid INT,
        overallpercentage DECIMAL(4, 2) DEFAULT 0,
        geographycorrect INT DEFAULT 0,
        musiccorrect INT DEFAULT 0,
        historycorrect INT DEFAULT 0,
        spanishcorrect INT DEFAULT 0,
        totalquizzes INT DEFAULT 0,
        totaltime INT DEFAULT 0,
        PRIMARY KEY (userstatsid),
        FOREIGN KEY (userid) REFERENCES users(userid) -- change column names to lowercase otherwise ERROR
    );

CREATE TABLE
    questions (
        questionid INT GENERATED ALWAYS AS IDENTITY,
        question VARCHAR(255) NOT NULL,
        answer VARCHAR(255) NOT NULL,
        optionone VARCHAR(255) NOT NULL,
        optiontwo VARCHAR(255) NOT NULL,
        optionthree VARCHAR(255) NOT NULL,
        subjectcat VARCHAR(3) NOT NULL, --spa, geo, mus, his
        difficulty INT NOT NULL -- 1(easy), 2(mid), 3(hard)
    );