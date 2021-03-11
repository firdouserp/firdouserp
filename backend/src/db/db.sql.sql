-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: firdouserp_prod
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applied`
--

DROP TABLE IF EXISTS `applied`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applied` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `key` longtext NOT NULL COMMENT 'TRIAL',
  `nvalue` int DEFAULT NULL COMMENT 'TRIAL',
  `svalue` varchar(100) DEFAULT NULL COMMENT 'TRIAL',
  `bvalue` tinyint(1) DEFAULT '0' COMMENT 'TRIAL',
  `trial107` char(1) DEFAULT NULL COMMENT 'TRIAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scode` varchar(45) DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  `title` varchar(45) NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `client` varchar(45) DEFAULT NULL,
  `project` varchar(45) DEFAULT NULL,
  `book_date` date DEFAULT NULL,
  `sale_price` decimal(50,0) DEFAULT NULL,
  `discount` decimal(45,0) DEFAULT NULL,
  `active` int DEFAULT NULL,
  `remarks` text,
  `name` text NOT NULL,
  `father_name` text NOT NULL,
  `residential_address` text,
  `phone_no` varchar(45) DEFAULT NULL,
  `occupation` text,
  `nationality` text NOT NULL,
  `cnic` varchar(15) NOT NULL,
  `reference_off` text,
  `nominee_name` text,
  `relation` text,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `father_name` varchar(45) DEFAULT NULL,
  `postal_address` text,
  `residential_address` text,
  `phone_office` varchar(45) DEFAULT NULL,
  `phone_residential` varchar(45) DEFAULT NULL,
  `phone_mobile` varchar(45) NOT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `reference_of` varchar(200) DEFAULT NULL,
  `nominee_name` varchar(45) DEFAULT NULL,
  `nominee_relation` varchar(45) DEFAULT NULL,
  `nominee_address` text,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `coa`
--

DROP TABLE IF EXISTS `coa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coa` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `scode` longtext COMMENT 'TRIAL',
  `code` longtext NOT NULL COMMENT 'TRIAL',
  `title` longtext NOT NULL COMMENT 'TRIAL',
  `iscashbook` double NOT NULL DEFAULT '0' COMMENT 'TRIAL',
  `isbankbook` double NOT NULL DEFAULT '0' COMMENT 'TRIAL',
  `notes` double NOT NULL DEFAULT '0' COMMENT 'TRIAL',
  `obal` int NOT NULL DEFAULT '0' COMMENT 'TRIAL',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRIAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `coa_type`
--

DROP TABLE IF EXISTS `coa_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coa_type` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `code` longtext NOT NULL COMMENT 'TRIAL',
  `title` longtext NOT NULL COMMENT 'TRIAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `code` longtext NOT NULL COMMENT 'TRIAL',
  `scode` longtext COMMENT 'TRIAL',
  `title` longtext NOT NULL COMMENT 'TRIAL',
  `designation` longtext NOT NULL COMMENT 'TRIAL',
  `grade` longtext NOT NULL COMMENT 'TRIAL',
  `department` longtext NOT NULL COMMENT 'TRIAL',
  `address` longtext COMMENT 'TRIAL',
  `city` longtext COMMENT 'TRIAL',
  `cnic` longtext COMMENT 'TRIAL',
  `remarks` longtext COMMENT 'TRIAL',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRIAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fprop`
--

DROP TABLE IF EXISTS `fprop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fprop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `oid` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `grn`
--

DROP TABLE IF EXISTS `grn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grn_no` varchar(45) DEFAULT NULL,
  `grn_date` date DEFAULT NULL,
  `po_id` int DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `created_by` text,
  `ref_no` varchar(45) DEFAULT NULL,
  `remarks` text,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `grn_details`
--

DROP TABLE IF EXISTS `grn_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grn_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stock_id` int NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `qty_ord` int NOT NULL,
  `qty_rec` int DEFAULT NULL,
  `unit_price` decimal(10,0) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `grn_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ledger`
--

DROP TABLE IF EXISTS `ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ledger` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `register_id` int DEFAULT NULL,
  `vou_no` longtext NOT NULL COMMENT 'TRIAL',
  `vou_date` date NOT NULL COMMENT 'TRIAL',
  `vou_type` longtext NOT NULL COMMENT 'TRIAL',
  `srno` int NOT NULL DEFAULT '0' COMMENT 'TRIAL',
  `coa` int NOT NULL DEFAULT '0' COMMENT 'TRIAL',
  `supplier` int DEFAULT '0' COMMENT 'TRIAL',
  `project` int DEFAULT '0' COMMENT 'TRIAL',
  `stock` int DEFAULT '0' COMMENT 'TRIAL',
  `unit` int DEFAULT '0' COMMENT 'TRIAL',
  `employee` int DEFAULT '0' COMMENT 'TRIAL',
  `refno` longtext COMMENT 'TRIAL',
  `chq_no` longtext COMMENT 'TRIAL',
  `chq_date` date DEFAULT NULL COMMENT 'TRIAL',
  `dr` decimal(15,2) NOT NULL DEFAULT '0.00' COMMENT 'TRIAL',
  `cr` decimal(15,2) NOT NULL DEFAULT '0.00' COMMENT 'TRIAL',
  `description` longtext NOT NULL COMMENT 'TRIAL',
  `remarks` longtext COMMENT 'TRIAL',
  PRIMARY KEY (`id`),
  KEY `fk_employees_coa_5` (`coa`),
  CONSTRAINT `fk_employees_coa_5` FOREIGN KEY (`coa`) REFERENCES `coa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2945 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `code` longtext NOT NULL COMMENT 'TRIAL',
  `scode` longtext COMMENT 'TRIAL',
  `title` longtext NOT NULL COMMENT 'TRIAL',
  `coa_type` int NOT NULL DEFAULT '0' COMMENT 'TRIAL',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRIAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `code` char(10) NOT NULL DEFAULT '0' COMMENT 'TRIAL',
  `scode` char(10) DEFAULT '0' COMMENT 'TRIAL',
  `title` varchar(300) NOT NULL DEFAULT 'Title of project' COMMENT 'TRIAL',
  `location` longtext COMMENT 'TRIAL',
  `city` varchar(30) DEFAULT NULL COMMENT 'TRIAL',
  `client` int DEFAULT '0' COMMENT 'TRIAL',
  `cost` int DEFAULT '0' COMMENT 'TRIAL',
  `nature` varchar(100) DEFAULT NULL COMMENT 'TRIAL',
  `remarks` longtext COMMENT 'TRIAL',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRIAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchase_details`
--

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchase_order`
--

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
  `status` text,
  `description` text,
  `po_no` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `floor` varchar(45) DEFAULT NULL,
  `block` varchar(45) DEFAULT NULL,
  `contact` int DEFAULT NULL,
  `total_cost` decimal(50,0) DEFAULT NULL,
  `on_booking` decimal(45,0) DEFAULT NULL,
  `on_allocation` decimal(45,0) DEFAULT NULL,
  `on_confirmation` decimal(45,0) DEFAULT NULL,
  `on_start` decimal(45,0) DEFAULT NULL,
  `monthly_installment` decimal(45,0) DEFAULT NULL,
  `quaterly_payment` decimal(45,0) DEFAULT NULL,
  `on_excavation` decimal(45,0) DEFAULT NULL,
  `on_foundation` decimal(45,0) DEFAULT NULL,
  `on_slab` decimal(45,0) DEFAULT NULL,
  `on_block` decimal(45,0) DEFAULT NULL,
  `on_plaster` decimal(45,0) DEFAULT NULL,
  `on_plumbing` decimal(45,0) DEFAULT NULL,
  `on_electric` decimal(45,0) DEFAULT NULL,
  `on_coloring` decimal(45,0) DEFAULT NULL,
  `on_finishing` decimal(45,0) DEFAULT NULL,
  `on_possesion` decimal(45,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `org_name` text,
  `org_address` text,
  `company_logo` varchar(45) DEFAULT NULL,
  `grn_account` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `code` longtext NOT NULL COMMENT 'TRIAL',
  `scode` longtext NOT NULL COMMENT 'TRIAL',
  `title` longtext NOT NULL COMMENT 'TRIAL',
  `uom` longtext NOT NULL COMMENT 'TRIAL',
  `remarks` longtext COMMENT 'TRIAL',
  `qty` double NOT NULL COMMENT 'TRIAL',
  `avg_rate` double NOT NULL COMMENT 'TRIAL',
  `adv_cost` double NOT NULL COMMENT 'TRIAL',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRIAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `code` char(10) NOT NULL DEFAULT '0' COMMENT 'TRIAL',
  `scode` char(10) DEFAULT '0' COMMENT 'TRIAL',
  `title` varchar(300) NOT NULL DEFAULT 'Supplier Title' COMMENT 'TRIAL',
  `person` varchar(30) DEFAULT NULL COMMENT 'TRIAL',
  `contact` varchar(30) DEFAULT NULL COMMENT 'TRIAL',
  `address` varchar(200) DEFAULT NULL COMMENT 'TRIAL',
  `city` varchar(30) DEFAULT NULL COMMENT 'TRIAL',
  `country` varchar(30) DEFAULT NULL COMMENT 'TRIAL',
  `email` varchar(100) DEFAULT NULL COMMENT 'TRIAL',
  `fax` varchar(30) DEFAULT NULL COMMENT 'TRIAL',
  `ntn` varchar(10) DEFAULT NULL COMMENT 'TRIAL',
  `stn` varchar(15) DEFAULT NULL COMMENT 'TRIAL',
  `cnic` varchar(13) DEFAULT NULL COMMENT 'TRIAL',
  `businesstitle` varchar(300) DEFAULT NULL COMMENT 'TRIAL',
  `nature` decimal(1,0) DEFAULT NULL COMMENT 'TRIAL',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRIAL',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idxcode` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `units` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'TRIAL',
  `code` longtext NOT NULL COMMENT 'TRIAL',
  `scode` longtext COMMENT 'TRIAL',
  `title` longtext NOT NULL COMMENT 'TRIAL',
  `utype` longtext COMMENT 'TRIAL',
  `ulocation` longtext COMMENT 'TRIAL',
  `usize` longtext COMMENT 'TRIAL',
  `remarks` longtext COMMENT 'TRIAL',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRIAL',
  `project` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` char(60) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('Admin','SuperUser') DEFAULT 'SuperUser',
  `age` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL COMMENT 'TRIAL',
  `code` longtext NOT NULL COMMENT 'TRIAL',
  `scode` char(10) DEFAULT NULL COMMENT 'TRIAL',
  `title` longtext NOT NULL COMMENT 'TRIAL',
  `empid` int DEFAULT NULL COMMENT 'TRIAL',
  `pw` longtext COMMENT 'TRIAL',
  `session` longtext COMMENT 'TRIAL',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='TRIAL';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `view_project_ledger`
--

DROP TABLE IF EXISTS `view_project_ledger`;
/*!50001 DROP VIEW IF EXISTS `view_project_ledger`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_project_ledger` AS SELECT 
 1 AS `id`,
 1 AS `Vou_Date`,
 1 AS `Vou_No`,
 1 AS `Description`,
 1 AS `DR`,
 1 AS `CR`,
 1 AS `Chq_No`,
 1 AS `Chq_Date`,
 1 AS `RefNo`,
 1 AS `Project`,
 1 AS `Project_Code`,
 1 AS `Project_Title`,
 1 AS `COA`,
 1 AS `COA_Code`,
 1 AS `coa_obal`,
 1 AS `COA_TITLE`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_trans_vouno`
--

DROP TABLE IF EXISTS `view_trans_vouno`;
/*!50001 DROP VIEW IF EXISTS `view_trans_vouno`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_trans_vouno` AS SELECT 
 1 AS `Voucher`,
 1 AS `MaxNo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_vouno`
--

DROP TABLE IF EXISTS `view_vouno`;
/*!50001 DROP VIEW IF EXISTS `view_vouno`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_vouno` AS SELECT 
 1 AS `Voucher`,
 1 AS `MaxNo`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `voucher_date` date NOT NULL,
  `voucher_no` varchar(45) NOT NULL,
  `voucher_type` varchar(45) DEFAULT NULL,
  `amount` decimal(10,0) NOT NULL,
  `approved` int DEFAULT '0',
  `remarks` text,
  `prepared_by` varchar(45) DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `chq_no` varchar(45) DEFAULT NULL,
  `chq_date` date DEFAULT NULL,
  `creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `voucher_number_UNIQUE` (`voucher_no`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `view_project_ledger`
--

/*!50001 DROP VIEW IF EXISTS `view_project_ledger`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_project_ledger` AS select `transactions`.`coa` AS `id`,cast(`transactions`.`vou_date` as date) AS `Vou_Date`,`transactions`.`vou_no` AS `Vou_No`,`transactions`.`description` AS `Description`,`transactions`.`dr` AS `DR`,`transactions`.`cr` AS `CR`,`transactions`.`chq_no` AS `Chq_No`,`transactions`.`chq_date` AS `Chq_Date`,`transactions`.`refno` AS `RefNo`,`transactions`.`project` AS `Project`,`projects`.`code` AS `Project_Code`,`projects`.`title` AS `Project_Title`,`transactions`.`coa` AS `COA`,`coa`.`code` AS `COA_Code`,`coa`.`obal` AS `coa_obal`,`coa`.`title` AS `COA_TITLE` from ((`transactions` left join `coa` on((`transactions`.`coa` = `coa`.`id`))) left join `projects` on((`transactions`.`project` = `projects`.`id`))) order by cast(`transactions`.`vou_date` as date),`transactions`.`project`,`transactions`.`coa` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_trans_vouno`
--

/*!50001 DROP VIEW IF EXISTS `view_trans_vouno`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_trans_vouno` AS select `temp`.`A` AS `Voucher`,max(`temp`.`D`) AS `MaxNo` from (select `transactions`.`vou_no` AS `Vou_No`,substr(`transactions`.`vou_no`,1,6) AS `A`,substr(`transactions`.`vou_no`,1,2) AS `B`,substr(`transactions`.`vou_no`,3,5) AS `C`,cast(substr(`transactions`.`vou_no`,8,4) as double) AS `D` from `transactions`) `temp` group by `temp`.`A` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_vouno`
--

/*!50001 DROP VIEW IF EXISTS `view_vouno`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_vouno` AS select `temp`.`A` AS `Voucher`,max(`temp`.`D`) AS `MaxNo` from (select `transactions`.`vou_no` AS `Vou_No`,substr(`transactions`.`vou_no`,1,6) AS `A`,substr(`transactions`.`vou_no`,1,2) AS `B`,substr(`transactions`.`vou_no`,3,5) AS `C`,cast(substr(`transactions`.`vou_no`,8,4) as double) AS `D` from `transactions`) `temp` group by `temp`.`A` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-09 15:30:30



/* NEW CHANAGES FROM HERE  11.03.2021*/

ALTER TABLE `transactions` 
ADD COLUMN `particulars` LONGTEXT NULL AFTER `created_by`;