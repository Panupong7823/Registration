CREATE DATABASE registration;
USE registration;

CREATE TABLE users ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname varchar(50),
    lastname varchar(50),
    email varchar(50),
    password varchar(100),
    requirement text
); 