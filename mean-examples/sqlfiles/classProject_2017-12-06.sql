# ************************************************************
# Sequel Pro SQL dump
# Version 4500
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18-0ubuntu0.16.04.1)
# Database: classProject
# Generation Time: 2017-12-07 01:20:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`id`, `username`, `password`)
VALUES
	(1,'admin','$2a$10$3wVznbJNdzsJnTdWi8KfFeYxohlt2pLnuVjZjNvIA1RyVlvGqc44W'),
	(2,'jazzy','$2a$10$umvAzlwChfqp1Cebued2h.pPF4MO7v299zO4t3yMbAaRy0KHC9jr.');

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table content
# ------------------------------------------------------------

DROP TABLE IF EXISTS `content`;

CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `text` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;

INSERT INTO `content` (`id`, `name`, `text`)
VALUES
	(1,'home','<h1>This is the home page.</h1>\n<p>Home page</p>'),
	(2,'about','<h1>This is the about page.</h1>\n<p>About page</p>');

/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table document
# ------------------------------------------------------------

DROP TABLE IF EXISTS `document`;

CREATE TABLE `document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;

INSERT INTO `document` (`id`, `file_name`, `file_path`)
VALUES
	(1,'Test file','/public/docs/71b4cf37242f65581f6d46212c33a301.pdf');

/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table name
# ------------------------------------------------------------

DROP TABLE IF EXISTS `name`;

CREATE TABLE `name` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `name` WRITE;
/*!40000 ALTER TABLE `name` DISABLE KEYS */;

INSERT INTO `name` (`id`, `first_name`, `last_name`, `email`)
VALUES
	(4,'Scott','Shaper','sshaper@test.com'),
	(5,'Karen','Shaper','kshaper@test.com'),
	(6,'Scottie','Shaper','sshaperjr@test.com');

/*!40000 ALTER TABLE `name` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
