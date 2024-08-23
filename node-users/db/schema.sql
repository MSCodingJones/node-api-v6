DROP DATABASE IF EXISTS userDB;
CREATE DATABASE userDB;
USE userDB;

CREATE TABLE user_profile (
    user_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    fName VARCHAR(40) NOT NULL,
    lName VARCHAR(40) NOT NULL,
    mi CHAR(1),
    email VARCHAR(60) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    CONSTRAINT pK_user PRIMARY KEY (user_id)
);

ALTER TABLE user_profile
    ADD COLUMN isActive BOOLEAN DEFAULT true,
    ADD COLUMN dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN lastUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE user_profile ADD UNIQUE (email);

 CREATE TABLE user_login (
    user_id MEDIUMINT UNSIGNED NOT NULL,
    email VARCHAR(60) NOT NULL,
    username VARCHAR (20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    acctNo CHAR(10) NOT NULL,
    lastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_login PRIMARY KEY (acctNo),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_profile (user_id),
    CONSTRAINT fk_email FOREIGN KEY (email) REFERENCES user_profile (email)
);

CREATE TABLE payment_info (
    payment_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id MEDIUMINT UNSIGNED NOT NULL,
    cardNo CHAR(16) NOT NULL UNIQUE, 
    expMonth CHAR(2) NOT NULL,
    expYear YEAR NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    CONSTRAINT pk_payment PRIMARY KEY (payment_id),
    CONSTRAINT fk_user_pay FOREIGN KEY (user_id) REFERENCES user_profile (user_id)
);

CREATE TABLE shipping_info (
    shipping_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id MEDIUMINT UNSIGNED NOT NULL,
    address VARCHAR(60) NOT NULL,
    city VARCHAR(40) NOT NULL,
    state CHAR(2) NOT NULL,
    postalCode CHAR(5) NOT NULL,
    country VARCHAR(40) DEFAULT "Murrica",
    CONSTRAINT pk_shipping PRIMARY KEY (shipping_id),
    CONSTRAINT fk_user_ship FOREIGN KEY (user_id) REFERENCES user_profile (user_id)
);


-- renaming table names
RENAME TABLE payment_info TO payment;
RENAME TABLE shipping_info TO shipping;
RENAME TABLE user_profile TO user;