-- Active: 1693846937653@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

INSERT INTO users(id, name, email, password)
VALUES
("001", "Regiane", "regiane@email.com", "123"),
("002", "Elvis", "elvis@email.com", "1235");

CREATE TABLE post(
    id TEXT PRIMARY KEY NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT DEFAULT(DATETIME()),
    updated_at TEXT DEFAULT(DATETIME()),
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

INSERT INTO post(id, creator_id, content, likes, dislikes)
VALUES (
        "p001",
        "u001",
        "Hello World",
        3,
        1
    );

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER
);