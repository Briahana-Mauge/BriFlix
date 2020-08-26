DROP DATABASE if exists briflix;
CREATE DATABASE briflix;

\c briflix

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    avatar_url VARCHAR NOT NULL
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    genre_name VARCHAR NOT NULL
);

CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL UNIQUE,
    img_url VARCHAR NOT NULL,
    genre_id INT REFERENCES genres(id)
);

CREATE TABLE show_users (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    show_id INT REFERENCES shows(id) 
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_body VARCHAR NOT NULL,
    user_id INT REFERENCES users(id),
    show_id INT REFERENCES shows(id)
);

-- INSERT GENRES
INSERT INTO genres (genre_name) VALUES ('Adventure'); -- 1
INSERT INTO genres (genre_name) VALUES ('Drama'); -- 2
INSERT INTO genres (genre_name) VALUES ('Comedy'); -- 3
INSERT INTO genres (genre_name) VALUES ('Fantasy'); -- 4
INSERT INTO genres (genre_name) VALUES ('Horror'); --5
INSERT INTO genres (genre_name) VALUES ('SciFi'); --6
INSERT INTO genres (genre_name) VALUES ('Anime'); --7
INSERT INTO genres (genre_name) VALUES ('Romance'); --8
INSERT INTO genres (genre_name) VALUES ('Suspense'); --9
INSERT INTO genres (genre_name) VALUES ('Historical'); --10
INSERT INTO genres (genre_name) VALUES ('Crime'); --11
INSERT INTO genres (genre_name) VALUES ('Action'); --12
INSERT INTO genres (genre_name) VALUES ('Mystery'); --13
INSERT INTO genres (genre_name) VALUES ('Western'); --14

-- INSERT USERS
INSERT INTO users (username, avatar_url) VALUES ('Jon Snow', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kit-harington-hair-jon-snow-1569167827.jpg?crop=0.439xw:0.878xh;0.0221xw,0.0306xh&resize=480:*'); -- 1
INSERT INTO users (username, avatar_url) VALUES ('Daenerys Targaryen', 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/36/1504608500-daenerys.jpg?crop=0.665xw:1.00xh;0.0950xw,0&resize=480:*'); -- 2
INSERT INTO users (username, avatar_url) VALUES ('Michael Scott', 'https://i1.sndcdn.com/avatars-000162505694-i81i0k-t500x500.jpg'); -- 3
INSERT INTO users (username, avatar_url) VALUES ('Pam Beesly', 'https://i1.sndcdn.com/avatars-000150274248-xnvnyn-t500x500.jpg'); -- 4

-- INSERT SHOWS
INSERT INTO shows (title, img_url, genre_id)
VALUES ('Game of Thrones', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', 4);
INSERT INTO shows (title, img_url, genre_id)
VALUES ('The Flash', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg', 1);
INSERT INTO shows (title, img_url, genre_id)
VALUES ('Naruto Shippūden', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/zAYRe2bJxpWTVrwwmBc00VFkAf4.jpg', 4);
INSERT INTO shows (title, img_url, genre_id)
VALUES ('Greys Anatomy', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/eqgIOObafPJitt8JNh1LuO2fvqu.jpg', 2);
INSERT INTO shows (title, img_url, genre_id)
VALUES ('The Simpsons', 'https://img.hulu.com/user/v3/artwork/47332072-d7fb-48b3-a5f7-ca8c6915ca27?base_image_bucket_name=image_manager&base_image=3c406fc1-f762-4d39-892a-4a4cad792c26&size=400x600&format=jpeg', 3);

-- INSERT show watchers
INSERT INTO show_users(user_id, show_id)
VALUES(1,1);
INSERT INTO show_users(user_id, show_id)
VALUES(2,1);
INSERT INTO show_users(user_id, show_id)
VALUES(3,1);
INSERT INTO show_users(user_id, show_id)
VALUES(1,2);
INSERT INTO show_users(user_id, show_id)
VALUES(3,2);
INSERT INTO show_users(user_id, show_id)
VALUES(4,2);
INSERT INTO show_users(user_id, show_id)
VALUES(1,3);
INSERT INTO show_users(user_id, show_id)
VALUES(2,3);
INSERT INTO show_users(user_id, show_id)
VALUES(3,4);
INSERT INTO show_users(user_id, show_id)
VALUES(1,5);
INSERT INTO show_users(user_id, show_id)
VALUES(4,5);


-- INSERT COMMENTS
INSERT INTO comments (comment_body, user_id, show_id)
VALUES ('BEST SHOW EVER!!', 1, 1);
INSERT INTO comments (comment_body, user_id, show_id)
VALUES ('Of course you would think so Jon', 2, 1);




