DROP DATABASE IF EXISTS data_warehouse

CREATE DATABASE data_warehouse
CREATE TABLE users( id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64) NOT NULL, lastname VARCHAR(64) NOT NULL, email VARCHAR(64) NOT NULL, admin BOOLEAN NOT NULL, password VARCHAR(64) NOT NULL )
