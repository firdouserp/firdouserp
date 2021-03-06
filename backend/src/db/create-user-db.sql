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




 DROP TABLE IF EXISTS `purchase_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stock_id` int NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `qty` int NOT NULL,
  `unit_price` decimal(10,0) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `po_id` int DEFAULT NULL,
  `qty_received` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

DROP TABLE IF EXISTS `purchase_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_date` date DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `supplier_id` int NOT NULL,
  `delivery_address` text,
  `created_on` date DEFAULT NULL,
  `created_by` text,
  `status` int DEFAULT NULL,
  `description` text,
  `po_no` varchar(45) NOT NULL,
  `grn_no` varchar(45) DEFAULT NULL,
  `refno` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

CREATE TABLE `fprop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `oid` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `grn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grn_no` varchar(45) DEFAULT NULL,
  `grn_date` date DEFAULT NULL,
  `po_id` int DEFAULT NULL,
  `po_no` varchar(45) NOT NULL,
  `created_on` date DEFAULT NULL,
  `created_by` text,
  `status` int DEFAULT NULL,
  `remarks` text,
  `refno` varchar(45) DEFAULT NULL,
  `supplier_id` int NOT NULL,
  `postledger` int DEFAULT '0',
  `vou_no` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

DROP TABLE IF EXISTS `grn_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grn_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stock_id` int NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `qty` int NOT NULL,
  `qty_rec` int NOT NULL,
  `unit_price` decimal(10,0) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `grn_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ;
ALTER TABLE `firdouserp`.`purchase_order` 
CHANGE COLUMN `status` `status` INT NULL DEFAULT NULL ;

CREATE VIEW view_project_ledger
AS
SELECT 
       id,
       DATE (Vou_Date) AS Vou_Date, 
       Vou_No,ledger.Description|| " " || Chq_No AS Description, 
       DR, 
       CR, 
       Chq_No, 
       Chq_Date, 
       RefNo, 
       Project, 
       projects.Code AS Project_Code, 
       Projects.Title AS Project_Title, 
       Supplier, 
       Suppliers.Code AS Supplier_Code, 
       Suppliers.Title AS Supplier_Title, 
       COA, 
       COA.Code AS COA_Code, 
       COA.TITLE AS COA_TITLE, 
       Unit, 
       Units.Code AS Unit_Code, 
       Units.Title AS Unit_Title
FROM   Ledger
       LEFT JOIN COA ON Ledger.COA = COA.ID
       LEFT JOIN Suppliers ON Ledger.Supplier= Suppliers.ID
       LEFT JOIN Projects ON Ledger.Project = Projects.ID
       LEFT JOIN Units ON Ledger.Unit = Units.ID
ORDER  BY
          Vou_Date,
          Project,
          Supplier,
          COA,
          Unit

          CREATE TABLE `setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `org_name` text,
  `org_address` text,
  `company_logo` varchar(45) DEFAULT NULL,
  `grn_account` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)



  aCREATE OR REPLACE VIEW `view_trans_vouno` AS select `temp`.`A` AS `Voucher`,max(`temp`.`D`) AS `MaxNo` from (select `transactions`.`vou_no` AS `Vou_No`,substr(`transactions`.`vou_no`,1,5) AS `A`,substr(`transactions`.`vou_no`,1,1) AS `B`,substr(`transactions`.`vou_no`,2,4) AS `C`,cast(substr(`transactions`.`vou_no`,7,4) as double) AS `D` from `transactions`) `temp` group by `temp`.`A`

  CREATE TABLE `transactions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `vou_id` int NOT NULL DEFAULT '0',
  `vou_no` varchar(15) NOT NULL,
  `vou_date` date NOT NULL,
  `vou_type` longtext NOT NULL,
  `tran_type` int NOT NULL DEFAULT '0',
  `srno` int NOT NULL DEFAULT '0',
  `coa` int NOT NULL DEFAULT '0',
  `project` int DEFAULT '0',
  `refno` longtext,
  `chq_no` longtext,
  `chq_date` date DEFAULT NULL,
  `dr` decimal(15,2) NOT NULL DEFAULT '0.00',
  `cr` decimal(15,2) NOT NULL DEFAULT '0.00',
  `description` longtext NOT NULL,
  `remarks` longtext,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transaction_coa` (`coa`),
  CONSTRAINT `fk_transaction_coa` FOREIGN KEY (`coa`) REFERENCES `coa` (`id`)
)

CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `view_project_ledger` AS
    SELECT 
        `transactions`.`coa`  AS `id`,
        CAST(`transactions`.`vou_date` AS DATE) AS `Vou_Date`,
        `transactions`.`vou_no` AS `Vou_No`,
        ((0 <> `transactions`.`description`)
            OR (0 <> ' ')
            OR (0 <> `transactions`.`chq_no`)) AS `Description`,
        `transactions`.`dr` AS `DR`,
        `transactions`.`cr` AS `CR`,
        `transactions`.`chq_no` AS `Chq_No`,
        `transactions`.`chq_date` AS `Chq_Date`,
        `transactions`.`refno` AS `RefNo`,
        `transactions`.`project` AS `Project`,
        `projects`.`code` AS `Project_Code`,
        `projects`.`title` AS `Project_Title`,
        `transactions`.`coa` AS `COA`,
        `coa`.`code` AS `COA_Code`,
        `coa`.`obal` AS `coa_obal`,
        `coa`.`title` AS `COA_TITLE`
    FROM
        ((`transactions`
        LEFT JOIN `coa` ON ((`transactions`.`coa` = `coa`.`id`)))
        LEFT JOIN `projects` ON ((`transactions`.`project` = `projects`.`id`)))
    ORDER BY CAST(`transactions`.`vou_date` AS DATE) , `transactions`.`project` , `transactions`.`coa`;
