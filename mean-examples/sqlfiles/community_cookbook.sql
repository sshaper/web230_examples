-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: community_cookbook
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--
CREATE DATABASE IF NOT EXISTS community_cookbook;

USE community_cookbook;


DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'Main Dish'),(2,'Baked Goods'),(3,'Low Fat'),(4,'Gluten Free'),(5,'Tastefully Simple'),(6,'Cookies'),(7,'Desert'),(8,'Salad');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cook`
--

DROP TABLE IF EXISTS `Cook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cook`
--

LOCK TABLES `Cook` WRITE;
/*!40000 ALTER TABLE `Cook` DISABLE KEYS */;
INSERT INTO `Cook` VALUES (1,'Community','Cookbook','sshaper@sshaper.com','sshaper1','Password1'),(2,'John','Doe','jdoe@test.com','johndoe1','Password1'),(3,'Jane','Doe','jdoe1@test.com','janedoe1','Password1'),(4,'Scott','Shaper','sshaper@scottie.com','sshaper','Karate11');
/*!40000 ALTER TABLE `Cook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Criteria`
--

DROP TABLE IF EXISTS `Criteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Criteria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Criteria`
--

LOCK TABLES `Criteria` WRITE;
/*!40000 ALTER TABLE `Criteria` DISABLE KEYS */;
INSERT INTO `Criteria` VALUES (1,'none'),(2,'skinless boneless breasts halves'),(3,'fresh sliced'),(4,'black freshly ground'),(5,'all purpose'),(6,'dried'),(7,'hearts drained'),(22,'chopped'),(23,'cream of Mushroom'),(40,'ground'),(41,'shredded Mexican style blend'),(42,'chips'),(43,'Dry'),(44,'mandarin'),(45,'cooked'),(46,'breasts'),(47,'sauce'),(48,'soup mix'),(49,'elbow'),(50,'chunks');
/*!40000 ALTER TABLE `Criteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Friend`
--

DROP TABLE IF EXISTS `Friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Friend` (
  `cook_id` int(11) DEFAULT NULL,
  `friend_id` int(11) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  KEY `cook_id_idxfk` (`cook_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Friend`
--

LOCK TABLES `Friend` WRITE;
/*!40000 ALTER TABLE `Friend` DISABLE KEYS */;
INSERT INTO `Friend` VALUES (1,2,'friend'),(1,1,'friend'),(1,3,'pending'),(3,3,'friend'),(2,1,'friend'),(2,2,'friend'),(4,4,'friend');
/*!40000 ALTER TABLE `Friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ingredient`
--

DROP TABLE IF EXISTS `Ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ingredient`
--

LOCK TABLES `Ingredient` WRITE;
/*!40000 ALTER TABLE `Ingredient` DISABLE KEYS */;
INSERT INTO `Ingredient` VALUES (1,'Green Beans'),(2,'Butter'),(3,'Cheese'),(4,'Milk'),(5,'Chicken'),(6,'Salt'),(7,'Pepper'),(8,'Paprika'),(11,'Mushrooms'),(12,'Flour'),(13,'Chicken broth'),(14,'Sherry'),(15,'Rosemary'),(16,'Artichoke'),(31,'Pork chops'),(32,'Garlic salt'),(33,'Onion'),(34,'Soup'),(36,'Beef'),(37,'Taco seasoning mix'),(38,'Sour cream'),(39,'Tortilla'),(40,'Cresent rolls'),(43,'Sugar'),(44,'Eggs'),(45,'Vanilla'),(47,'Baking soda'),(48,'Milk chocolate toffee bits'),(49,'Vinegar'),(50,'Celery seed'),(51,'Mustard'),(52,'Cooking Oil'),(53,'Cabbage'),(54,'Cottage Cheese'),(55,'Jell-O '),(56,'Cool Whip'),(57,'Oranges'),(58,'Pinapple'),(59,'Regular Sausage'),(60,'Spaghetti Sauce'),(61,'Italian seasoning'),(62,'Italian Sausage'),(63,'Cheese whiz'),(64,'Rotel'),(65,'Rice'),(66,'Cranberry'),(67,'Catalina dressing'),(68,'Orange Juice'),(69,'Macaroni'),(70,'Broccoli'),(71,'Mushroom soup'),(72,'Nutmeg'),(73,'Garlic powder'),(74,'Ham'),(75,'Margarine'),(76,'Mixed vegetables'),(77,'Pie crust');
/*!40000 ALTER TABLE `Ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipe`
--

DROP TABLE IF EXISTS `Recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cook_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `original_author` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `instructions` text,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `cook_id_idxfk` (`cook_id`)
) ENGINE=MyISAM AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipe`
--

LOCK TABLES `Recipe` WRITE;
/*!40000 ALTER TABLE `Recipe` DISABLE KEYS */;
INSERT INTO `Recipe` VALUES (63,1,'Southern Slaw','Carolyn Monroe',8,'&lt;p&gt;Layer shredded cabbage and chopped onion in a long dish, combine vinegar and sugar, salt, celery seed, dry mustard in a saucepan. &Acirc;&nbsp;Bring to a boil. Remove from heat and add cooking oil. &Acirc;&nbsp;Drip hot mixture over cabbage. Cover and refrigerate for 24 hours or longer before serving.&lt;/p&gt;','none'),(64,1,'Orange Jell-O Salad','Brenda Monroe',8,'&lt;p&gt;Sprinkle dry Jell-O, and cottege cheese mix well. Then mix in the mandarin orange, pineapple with the cottage chesse and Jell-O. Refriderate until ready to serve then add cool whip to top.&lt;/p&gt;','none'),(66,1,'Baked Zeti','Sheryl Monroe',1,'&lt;ol&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Brown sausage, pepper and onion&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;(Drain) Mix with Spaghetti Sauce &Acirc;&nbsp;&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Add Italian seasoning and ricotta cheese&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Pour into large baking pan and cover with mazzarella cheese&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Bake at 400 degrees for 30 minutes or until fully heated&lt;/span&gt;&lt;/li&gt;\n&lt;/ol&gt;','none'),(67,1,'Clock Watcher&#039;s Supper','Sheryl Monroe',1,'&lt;ol&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Brown hamburger meat and drain&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Add cheeze whiz until melted with hamburger&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Add Rotel&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Serve over rice&lt;/span&gt;&lt;/li&gt;\n&lt;/ol&gt;','none'),(68,1,'Cranberry Orange Chicken','Rosemary Kuderick and  Mary Ann Wroubel',1,'&lt;ol&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Preheat oven to 350 degrees&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Spray cooking oil on a 9x13 inch baking pan&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Thoroughly whisk together the 4 ingredients, excluding the chicken&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Spoon 1/3 of the mixture into the baking dish, lay in chicken and spread remaining mixture over the chicken&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Cover the dish with foil and bake for 45 minutes.&lt;/span&gt;&lt;/li&gt;\n&lt;/ol&gt;','none'),(69,1,'Speedy Ham and Macaroni','Carolyn Monroe',1,'&lt;ol&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;In a large saucepan, cook macaroni in boiling water for 5 minutes&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Add broccoli, return to boil&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Cook for 2-3 minutes or until macaroni is tender&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Drain&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Return to pan and combine soups, milk, butter, nutmeg, garlic powder and pepper.&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Add to macaroni mixture with ham&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Mix well&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Heat through&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Garnish with Parmesan or chedder cheese if desired&lt;/span&gt;&lt;/li&gt;\n&lt;/ol&gt;','none'),(70,1,'Chicken Pot Pie','Wayma Monroe',1,'&lt;ol&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Heat margarine over low heat until melted&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Blend in flour, onions and cover over low heat stirring constantly until mixture is smooth&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Stir in chicken broth and milk&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Heat until boiling and thick&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Stir in chopped meat and frozen vegatables&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Pour in pie shell, cover top with other pie shell. Cut a slit in the middle of top pie shell&lt;/span&gt;&lt;/li&gt;\n&lt;li&gt;&lt;span style=&quot;line-height: 1.5;&quot;&gt;Cook at 425 degrees for about 30 - 35 minutes&lt;/span&gt;&lt;/li&gt;\n&lt;/ol&gt;','none');
/*!40000 ALTER TABLE `Recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecipeIngredient`
--

DROP TABLE IF EXISTS `RecipeIngredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RecipeIngredient` (
  `recipe_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `criteria_id` int(11) NOT NULL,
  `ingredient_amount` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  KEY `recipe_id_idxfk` (`recipe_id`),
  KEY `ingredient_id_idxfk` (`ingredient_id`),
  KEY `criteria_id_idxfk` (`criteria_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecipeIngredient`
--

LOCK TABLES `RecipeIngredient` WRITE;
/*!40000 ALTER TABLE `RecipeIngredient` DISABLE KEYS */;
INSERT INTO `RecipeIngredient` VALUES (64,54,1,'1 box',1),(64,55,1,'1 small box orange',1),(64,56,1,'1 large',1),(64,57,44,'1 can drained and cut up',1),(64,58,1,'1 small can crushed drained',1),(63,33,1,'1',1),(63,49,1,'1 cup',1),(63,43,1,'1 cup',1),(63,6,1,'1 teaspoon',1),(63,50,1,'1 teaspoon',1),(63,51,43,'1 Teaspoon',1),(63,52,1,'1/3 cup',1),(63,53,1,'1 head',1),(67,36,40,'1 pound',1),(67,63,1,'2 jars',1),(67,64,1,'1 can',1),(67,65,45,'4 cups',1),(66,59,1,'1',1),(66,60,1,'2 large jars',1),(66,33,22,'1',1),(66,61,1,'4 tablespoons',1),(66,62,1,'1',1),(69,69,49,'2 cups',1),(69,70,1,'1 10 ounce package frozen chopped',1),(69,71,1,'1 can (10 3/4 ounce) condensed',1),(69,4,1,'1/2 cup',1),(69,72,40,'1/2 teaspoon',1),(69,73,1,'1/8 teaspoon',1),(69,7,1,'1/8 teaspoon',1),(69,74,1,'2 cups cubed fully cooked',1),(69,3,1,'Grated Parmesan or Chedder',1),(68,5,46,'8 small to medium boneless skinless',1),(68,66,47,'1 16 ounce whole berry or jellied',1),(68,33,48,'1 13 ounce package dry',1),(68,67,1,'1 8 ounce (fat free)',1),(68,68,1,'2/3 cup',1),(70,75,1,'1/3 cup',1),(70,12,1,'1/3 cup',1),(70,33,22,'1/3 cup',1),(70,13,1,'1 cup',1),(70,4,1,'2/3 cup ',1),(70,5,50,'2 cups ',1),(70,76,1,'1 small package frozen',1),(70,77,1,'2 ',1);
/*!40000 ALTER TABLE `RecipeIngredient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-10 14:45:01
