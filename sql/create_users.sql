DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    surname VARCHAR (50) NOT NULL,
    first_name VARCHAR (50) NOT NULL,
    email CHAR(20) NOT NULL,
    password VARCHAR(80) NOT NULL
);


-- Your 'users' table will have the following fields: 

-- A unique key (ID),
-- A surname,
-- A first name,
-- An email address (will be used to log in),
-- A password (will be used to log in),