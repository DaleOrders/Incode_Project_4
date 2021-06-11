DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER FOREIGN KEY,
    day INTEGER CHECK(day>=0 && day<=7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    surname VARCHAR (50) NOT NULL,
    first_name VARCHAR (50) NOT NULL,
    email CHAR(20) NOT NULL,
    password VARCHAR(80) NOT NULL
);





-- Your ’schedules' table will have the following fields: 

-- A unique key (ID),
-- An ID_user (will be a reference to an ID of the users table),
-- the day of the week (1 for Monday, 2 for Tuesday... 7 for Sunday),
-- a start time (TIME type)
-- an end time (TIME type).