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

CREATE TABLE `firdouserp`.`vouchertypes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `ttile` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `firdouserp`.`schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `date` DATE NULL,
  `unit` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `floor` VARCHAR(45) NULL,
  `block` VARCHAR(45) NULL,
  `contact` INT NULL,
  `total_cost` DECIMAL(50) NULL,
  `on_booking` DECIMAL(45) NULL,
  `on_allocation` DECIMAL(45) NULL,
  `on_confirmation` DECIMAL(45) NULL,
  `on_start` DECIMAL(45) NULL,
  `monthly_installment` DECIMAL(45) NULL,
  `quaterly_payment` DECIMAL(45) NULL,
  `on_excavation` DECIMAL(45) NULL,
  `on_foundation` DECIMAL(45) NULL,
  `on_slab` DECIMAL(45) NULL,
  `on_block` DECIMAL(45) NULL,
  `on_plaster` DECIMAL(45) NULL,
  `on_plumbing` DECIMAL(45) NULL,
  `on_electric` DECIMAL(45) NULL,
  `on_coloring` DECIMAL(45) NULL,
  `on_finishing` DECIMAL(45) NULL,
  `on_possesion` DECIMAL(45) NULL,
  PRIMARY KEY (`id`));


ALTER TABLE `firdouserp`.`ledger` 
ADD COLUMN `register_id` INT NOT NULL AFTER `id`;
CREATE OR REPLACE VIEW `view_vouno` AS select `temp`.`A` AS `Voucher`,max(`temp`.`D`) AS `MaxNo` from (select `ledger`.`vou_no` AS `Vou_No`,substr(`ledger`.`vou_no`,1,5) AS `A`,substr(`ledger`.`vou_no`,1,1) AS `B`,substr(`ledger`.`vou_no`,2,4) AS `C`,cast(substr(`ledger`.`vou_no`,7,4) as double) AS `D` from `ledger`) `temp` group by `temp`.`A`

ALTER TABLE `firdouserp`.`units` 
ADD COLUMN `project` INT NULL AFTER `active`;
ALTER TABLE `firdouserp`.`ledger` 
CHANGE COLUMN `register_id` `register_id` INT NULL ;

create or replace view view_ledger_report as
select n.id headid,n.title headtitle,c.title accounttitle,l.coa accountid ,sum(l.dr) sum_debit, sum(l.cr) sum_credit from ledger l LEFT OUTER JOIN coa c on l.coa=c.id LEFT OUTER JOIN notes n on c.notes=n.id group by l.coa

create or replace view view_ledger_head_report as
select headtitle,accounttitle, sum(sum_debit) as sum_debit_head,sum(sum_credit) sum_credit_head,
JSON_ARRAYAGG(JSON_OBJECT('headtitle',headtitle,'accounttitle',accounttitle,'sum_debit',sum_debit,'sum_credit',sum_credit))  from view_ledger_report group by headid




  CREATE TABLE `purchase_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_date` date DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `supplier_id` varchar(45) DEFAULT NULL,
  `delivery_address` text,
  ` created_on` date DEFAULT NULL,
  `created_by` text,
  `status` text,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


CREATE TABLE `purchase_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stock_id` varchar(45) NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `qty` int NOT NULL,
  `unit_price` decimal(10,0) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `po_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
