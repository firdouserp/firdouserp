-- DROP DATABASE IF EXISTS test_db;   
-- CREATE DATABASE IF NOT EXISTS test_db;   
USE test_db; 

DROP TABLE IF EXISTS user; 

CREATE TABLE IF NOT EXISTS user 
  ( 
     id         INT PRIMARY KEY auto_increment, 
     username   VARCHAR(25) UNIQUE NOT NULL, 
     password   CHAR(60) NOT NULL, 
     first_name VARCHAR(50) NOT NULL, 
     last_name  VARCHAR(50) NOT NULL, 
     email      VARCHAR(100) UNIQUE NOT NULL, 
     role       ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser', 
     age        INT(11) DEFAULT 0 
  ); 
  CREATE TABLE `firdouserp`.`vouchers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `voucher_date` DATE NOT NULL,
  `voucher_no` VARCHAR(45) NOT NULL,
  `voucher_type` VARCHAR(45) NULL,
  `amount` DECIMAL(10) NOT NULL,
  `approved` INT NULL DEFAULT 0,
  `remarks` TEXT NULL,
  `prepared_by` VARCHAR(45) NULL,
  `project_id` INT NULL,
  `created_by` VARCHAR(45) NULL,
  `chq_no` VARCHAR(45) NULL,
  `chq_date` DATE NULL,
  `creation_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `voucher_number_UNIQUE` (`voucher_no` ASC) VISIBLE);


   CREATE TABLE `firdouserp`.`booking` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `scode` VARCHAR(45) NULL,
  `code` VARCHAR(45) NULL,
  `title` VARCHAR(45) NOT NULL,
  `unit` VARCHAR(45) NULL,
  `client` VARCHAR(45) NULL,
  `project` VARCHAR(45) NULL,
  `book_date` DATE NULL,
  `sale_price` DECIMAL(50) NULL,
  `discount` DECIMAL(45) NULL,
  `active` INT NULL,
  `remarks` TEXT NULL,
  `name` TEXT NOT NULL,
  `father_name` TEXT NOT NULL,
  `residential_address` TEXT NULL,
  `phone_no` VARCHAR(45) NULL,
  `occupation` TEXT NULL,
  `nationality` TEXT NOT NULL,
  `cnic` INT NOT NULL,
  `reference_off` TEXT NULL,
  `nominee_name` TEXT NULL,
  `relation` TEXT NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

