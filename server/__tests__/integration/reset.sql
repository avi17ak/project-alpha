-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    userid INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (userid)
);

-- Clear users table
TRUNCATE users RESTART IDENTITY CASCADE;

-- Seed initial users
INSERT INTO users (name, email, password, username)
VALUES
    ('name 1', 'user1@test.com', 'lafosse', 'user1'),
    ('name 2', 'user2@test.com', 'lafosse', 'user2'),
    ('name 3', 'user3@test.com', 'lafosse', 'user3'),
    ('name 4', 'user4@test.com', 'lafosse', 'newuser'); -- add user4 for tests

-- Create userstats table if it doesn't exist
CREATE TABLE IF NOT EXISTS userstats (
    userstatsid INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) NOT NULL UNIQUE,
    userid INT NOT NULL REFERENCES users(userid),
    overallpercentage INT DEFAULT 0,
    geographycorrect INT DEFAULT 0,
    musiccorrect INT DEFAULT 0,
    historycorrect INT DEFAULT 0,
    spanishcorrect INT DEFAULT 0,
    totalquizzes INT DEFAULT 0,
    totaltime INT DEFAULT 0,
    PRIMARY KEY (userstatsid)
);

-- Clear userstats table
TRUNCATE userstats RESTART IDENTITY CASCADE;

-- Seed initial userstats
INSERT INTO userstats (username, userid, overallpercentage, geographycorrect, musiccorrect, historycorrect, spanishcorrect, totalquizzes, totaltime)
VALUES
    ('user1', 1, 50, 1, 0, 1, 0, 5, 300),
    ('user2', 2, 40, 1, 1, 0, 0, 3, 200),
    ('user3', 3, 30, 0, 1, 1, 0, 2, 100);
