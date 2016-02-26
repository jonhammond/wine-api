DROP DATABASE IF EXISTS wines;
CREATE DATABASE wines;

\c wines;

-- CREATE TABLE
CREATE TABLE wineTable (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  rating INTEGER,
  notes VARCHAR,
  price INTEGER,
  region VARCHAR
  );

INSERT INTO wineTable (name, rating, notes, price, region)
  VALUES ('Old Vine Red', 90, 'Some things that wine people say about good wine', 13.99, 'California');