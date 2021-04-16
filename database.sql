DROP DATABASE IF EXISTS data_warehouse

CREATE DATABASE data_warehouse
CREATE TABLE users( id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64) NOT NULL, lastname VARCHAR(64) NOT NULL, email VARCHAR(64) NOT NULL, admin BOOLEAN NOT NULL, password VARCHAR(64) NOT NULL );
CREATE TABLE regions( id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(64) NOT NULL );
CREATE TABLE countries( id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, region_id INT(10) NOT NULL, name VARCHAR(64) NOT NULL, FOREIGN KEY (region_id) REFERENCES regions(id) );
CREATE TABLE cities( id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, country_id INT(10) NOT NULL, name VARCHAR(64) NOT NULL, FOREIGN KEY (country_id) REFERENCES countries(id) );
CREATE TABLE companies(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    cityId INT(10) NOT NULL,
    address VARCHAR(64),
    email VARCHAR(64) NOT NULL,
    telephone INT(64) NOT NULL
);
CREATE TABLE contacts(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    company_id INT(10) NOT NULL,
    position VARCHAR(64) NOT NULL,
    contact_channel INT(10),
    interest INT(10)
    );

CREATE TABLE contact_channels(
	id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    contactId INT(10) NOT NULL,
    contact_channel_id INT(10) NOT NULL,
    user_account VARCHAR(64) NOT NULL,
    preferences_id INT(10)
    );
CREATE TABLE contact_social_media(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64)
    );
CREATE TABLE preferences( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64) );

ALTER TABLE contacts
ADD COLUMN address VARCHAR(64),
ADD COLUMN cityId INT(10) NOT NULL 

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `admin`, `password`) VALUES
(1, 'Admin', '', 'root', 1, '$2b$10$9j4bY6zqMKcJ9DQnIZzMpusQFXVw1p18m6P.MO37BQBQ51U9UnwQS');
