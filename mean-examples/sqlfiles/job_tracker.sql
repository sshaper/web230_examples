# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20-0ubuntu0.16.04.1)
# Database: job_tracker
# Generation Time: 2017-12-08 20:21:06 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS job_tracker;

USE job_tracker;



# Dump of table account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip` varchar(15) NOT NULL,
  `folder` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;

INSERT INTO `account` (`id`, `name`, `address`, `state`, `city`, `zip`, `folder`)
VALUES
	(1,'Shaper Enterprises','123 somewhere','MI','anyplace','12345','shaperenterprises'),
	(2,'Jazzy\'s Web Designs','123 somewhere','MI','anyplace','12345','jazzy_web'),
	(5,'Fake Account update','123 somewhere','MI','anyplace','12345','fakeaccount');

/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table account_asset
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account_asset`;

CREATE TABLE `account_asset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `account_asset` WRITE;
/*!40000 ALTER TABLE `account_asset` DISABLE KEYS */;

INSERT INTO `account_asset` (`id`, `account_id`, `name`, `file`)
VALUES
	(4,2,'Account Asset 1','jazzy_web/newsletterorform5.pdf'),
	(7,1,'Account Asset document 3','shaperenterprises/newsletterorform3.pdf');

/*!40000 ALTER TABLE `account_asset` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table account_job_contact
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account_job_contact`;

CREATE TABLE `account_job_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `account_job_contact` WRITE;
/*!40000 ALTER TABLE `account_job_contact` DISABLE KEYS */;

INSERT INTO `account_job_contact` (`id`, `account_id`, `job_id`, `contact_id`)
VALUES
	(5,1,2,4),
	(11,2,4,11),
	(13,2,4,4),
	(17,5,13,17),
	(19,5,14,19);

/*!40000 ALTER TABLE `account_job_contact` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`id`, `email`, `password`)
VALUES
	(1,'admin@test.com','$2a$10$ghP42SR5fRbgdoChQLES3u4pzGwJxK0SIbmmlcSQ522MgJXiLnw1G');

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contact
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `work_phone` varchar(15) NOT NULL,
  `mobile_phone` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;

INSERT INTO `contact` (`id`, `name`, `work_phone`, `mobile_phone`, `email`)
VALUES
	(4,'Scott Shaper','999.999.9999','999.999.9999','sshaper@test.com'),
	(11,'Jazzy Shaper','999.999.9999','999.999.9999','jshaper@test.com'),
	(19,'Fake Contact','999.999.9999','999.999.9999','fake@fake.com');

/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table job
# ------------------------------------------------------------

DROP TABLE IF EXISTS `job`;

CREATE TABLE `job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `folder` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;

INSERT INTO `job` (`id`, `account_id`, `name`, `folder`)
VALUES
	(2,1,'Test job','test_job_folder'),
	(4,2,'jazzy job 1','jazzy_one'),
	(14,5,'Fake job','fake_job_folder');

/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table job_asset
# ------------------------------------------------------------

DROP TABLE IF EXISTS `job_asset`;

CREATE TABLE `job_asset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `job_asset` WRITE;
/*!40000 ALTER TABLE `job_asset` DISABLE KEYS */;

INSERT INTO `job_asset` (`id`, `job_id`, `name`, `file`)
VALUES
	(1,4,'Job Asset 1','jazzy_web/jazzy_one/newsletterorform5.pdf'),
	(3,2,'Job Asset form 3','shaperenterprises/test_job_folder/newsletterorform3.pdf');

/*!40000 ALTER TABLE `job_asset` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table job_hour
# ------------------------------------------------------------

DROP TABLE IF EXISTS `job_hour`;

CREATE TABLE `job_hour` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `job_date` varchar(255) NOT NULL,
  `job_hours` decimal(10,2) NOT NULL,
  `hourly_rate` int(11) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `job_hour` WRITE;
/*!40000 ALTER TABLE `job_hour` DISABLE KEYS */;

INSERT INTO `job_hour` (`id`, `job_id`, `job_date`, `job_hours`, `hourly_rate`, `description`)
VALUES
	(2,4,'1484456400000',4.00,75,'I created all the html assets'),
	(3,4,'1484715600000',6.00,75,'I wrote the backend code'),
	(6,14,'1502769600000',6.00,75,'did something');

/*!40000 ALTER TABLE `job_hour` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table job_note
# ------------------------------------------------------------

DROP TABLE IF EXISTS `job_note`;

CREATE TABLE `job_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `note_date` varchar(255) NOT NULL,
  `note_name` varchar(255) NOT NULL,
  `note` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `job_note` WRITE;
/*!40000 ALTER TABLE `job_note` DISABLE KEYS */;

INSERT INTO `job_note` (`id`, `job_id`, `note_date`, `note_name`, `note`)
VALUES
	(1,2,'1502769600000','Test note','This is a test note for the test job of shaper enterprises');

/*!40000 ALTER TABLE `job_note` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
