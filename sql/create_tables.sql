DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (255) NOT NULL,
    surname VARCHAR (255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS schedules (
    schedule SERIAL PRIMARY KEY,
    user_id INTEGER,
    day INTEGER NOT NULL CHECK (day >= 1 AND day <= 7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    CONSTRAINT fk_id
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);



