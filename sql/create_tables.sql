DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    surname VARCHAR (255) NOT NULL,
    first_name VARCHAR (255) NOT NULL,
    email CHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER,
    day INTEGER CHECK(day>=0 && day<=7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    CONSTRAINT fk_id
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);



