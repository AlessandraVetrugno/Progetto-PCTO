-- MariaDB dump 10.17  Distrib 10.4.14-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: tamponi
-- ------------------------------------------------------
-- Server version	10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amministratore_presidio`
--

DROP TABLE IF EXISTS `amministratore_presidio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amministratore_presidio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `codice` varchar(11) NOT NULL,
  `password` varchar(150) NOT NULL,
  `id_presidio` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `amministratore_presidio_codice_uindex` (`codice`),
  KEY `amministratore_presidio_presidio_id_fk` (`id_presidio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amministratore_presidio`
--

LOCK TABLES `amministratore_presidio` WRITE;
/*!40000 ALTER TABLE `amministratore_presidio` DISABLE KEYS */;
INSERT INTO `amministratore_presidio` VALUES (1,'Alberto Angelo','1000000001','$2y$10$Onvg6g9kd2bHGGrCnbzyHOD5Y9wXmA/nKiJsGC9pu7.YVxZHtc8pS',1);
/*!40000 ALTER TABLE `amministratore_presidio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amministratore_sistema`
--

DROP TABLE IF EXISTS `amministratore_sistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amministratore_sistema` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `codice` varchar(11) NOT NULL,
  `password` varchar(150) NOT NULL,
  UNIQUE KEY `amministratore_sistema_codice_uindex` (`codice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amministratore_sistema`
--

LOCK TABLES `amministratore_sistema` WRITE;
/*!40000 ALTER TABLE `amministratore_sistema` DISABLE KEYS */;
INSERT INTO `amministratore_sistema` VALUES (1,'Federico Gavazzi','1111','$2y$10$a5RUkM8xgF1zsWQ73EI68.dSXuiNhAWHOwNBOVtefs0lTf4fQ8Wy2'),(2,'Nizar Nadif','1112','$2y$10$.waQOaODdf6mwHDN6G1eDudTqGiGhY9JorlpK0UQlSR333VAL8xeK ');
/*!40000 ALTER TABLE `amministratore_sistema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operatore_sanitario`
--

DROP TABLE IF EXISTS `operatore_sanitario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operatore_sanitario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) DEFAULT NULL,
  `codice` varchar(11) NOT NULL,
  `password` varchar(150) NOT NULL,
  `id_presidio` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `operatore_sanitario_codice_uindex` (`codice`),
  KEY `operatore_sanitario_presidio_id_fk` (`id_presidio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operatore_sanitario`
--

LOCK TABLES `operatore_sanitario` WRITE;
/*!40000 ALTER TABLE `operatore_sanitario` DISABLE KEYS */;
INSERT INTO `operatore_sanitario` VALUES (1,'Gino Bartali','1000022351','$2y$10$Fv9pijCGJ.95PIjTTCFFB.KmPkKZEa0s0lI5QODOY3v8jboUILMn2',1);
/*!40000 ALTER TABLE `operatore_sanitario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prenotazione`
--

DROP TABLE IF EXISTS `prenotazione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prenotazione` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `codice_fiscale` varchar(16) NOT NULL,
  `data` date NOT NULL,
  `codice` varchar(100) NOT NULL,
  `eseguito` tinyint(1) DEFAULT 0,
  `note` text DEFAULT NULL,
  `annullato` tinyint(1) DEFAULT 0,
  `id_presidio` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `prenotazione_presidio_id_fk` (`id_presidio`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prenotazione`
--

LOCK TABLES `prenotazione` WRITE;
/*!40000 ALTER TABLE `prenotazione` DISABLE KEYS */;
INSERT INTO `prenotazione` VALUES (4,'PTNGNN80A01D122H','2021-05-12','60964545C6326',0,NULL,1,1),(5,'PTNGNN80A01D122H','2021-05-10','6097DCEA2ACD5',0,NULL,0,1),(6,'PTNGNN80A01D122H','2021-05-11','6097DD4B6E828',0,NULL,0,1),(7,'PTNGNN80A01D122H','2020-05-01','6097DD8097E6F',0,NULL,0,1),(8,'PTNGNN80A01D122H','2020-10-01','60980C29E0EB7',0,NULL,0,1),(9,'PTNGNN80A01D122H','2020-11-01','60980C9293A84',0,NULL,0,1),(10,'PTNGNN80A01D122H','2020-10-01','60980D567C190',0,NULL,0,1),(11,'PTNGNN80A01D122H','2020-11-01','6099534F374B1',0,NULL,0,1);
/*!40000 ALTER TABLE `prenotazione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presidio`
--

DROP TABLE IF EXISTS `presidio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presidio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `indirizzo` varchar(255) DEFAULT NULL,
  `id_provincia` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `presidio_provincia_id_fk` (`id_provincia`),
  CONSTRAINT `presidio_provincia_id_fk` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presidio`
--

LOCK TABLES `presidio` WRITE;
/*!40000 ALTER TABLE `presidio` DISABLE KEYS */;
INSERT INTO `presidio` VALUES (1,'Centro Volta','Via della Volta',17);
/*!40000 ALTER TABLE `presidio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincia`
--

DROP TABLE IF EXISTS `provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provincia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `id_regione` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `provincia_regione_id_fk` (`id_regione`),
  CONSTRAINT `provincia_regione_id_fk` FOREIGN KEY (`id_regione`) REFERENCES `regione` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia`
--

LOCK TABLES `provincia` WRITE;
/*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
INSERT INTO `provincia` VALUES (1,'Agrigento',15),(2,'Alessandria',12),(3,'Ancona',10),(4,'Aosta',19),(5,'Arezzo',16),(6,'Ascoli Piceno',10),(7,'Asti',12),(8,'Avellino',4),(9,'Bari',13),(10,'Barletta-Andria-Trani',13),(11,'Belluno',20),(12,'Benevento',4),(13,'Bergamo',9),(14,'Biella',12),(15,'Bologna',5),(16,'Bolzano',17),(17,'Brescia',9),(18,'Brindisi',13),(19,'Cagliari',14),(20,'Caltanisetta',15),(21,'Campobasso',11),(22,'Caserta',4),(23,'Catania',15),(24,'Catanzaro',3),(25,'Chieti',1),(26,'Como',9),(27,'Cosenza',3),(28,'Cremona',9),(29,'Crotone',3),(30,'Cuneo',12),(31,'Enna',15),(32,'Fermo',10),(33,'Ferrara',5),(34,'Firenze',16),(35,'Foggia',13),(36,'Forlì-Cesena',5),(37,'Frosinone',7),(38,'Genova',8),(39,'Gorizia',6),(40,'Grosseto',16),(41,'Imperia',8),(42,'Isernia',11),(43,'L\'Aquila',1),(44,'La Spezia',8),(45,'Latina',7),(46,'Lecce',13),(47,'Lecco',9),(48,'Livorno',16),(49,'Lodi',9),(50,'Lucca',16),(51,'Macerata',10),(52,'Mantova',9),(53,'Massa-Carrara',16),(54,'Matera',2),(55,'Messina',15),(56,'Milano',9),(57,'Modena',5),(58,'Monza e Brianza',9),(59,'Napoli',4),(60,'Novara',12),(61,'Nuoro',14),(62,'Oristano',14),(63,'Padova',20),(64,'Palermo',15),(65,'Parma',5),(66,'Pavia',9),(67,'Perugia',18),(68,'Pesaro e Urbino',10),(69,'Pescara',1),(70,'Piacenza',5),(71,'Pisa',16),(72,'Pistoia',16),(73,'Pordenone',6),(74,'Potenza',2),(75,'Prato',16),(76,'Ragusa',15),(77,'Ravenna',5),(78,'Reggio Calabria',3),(79,'Reggio Emilia',5),(80,'Rieti',7),(81,'Rimini',5),(82,'Roma',7),(83,'Rovigo',20),(84,'Salerno',4),(85,'Sassari',14),(86,'Savona',8),(87,'Siena',16),(88,'Siracusa',15),(89,'Sondrio',9),(90,'Sud Sardegna',14),(91,'Taranto',13),(92,'Teramo',1),(93,'Terni',18),(94,'Torino',12),(95,'Trapani',15),(96,'Trento',17),(97,'Treviso',20),(98,'Trieste',6),(99,'Udine',6),(100,'Varese',9),(101,'Venezia',20),(102,'Verbano-Cusio-Ossola',12),(103,'Vercelli',12),(104,'Verona',20),(105,'Vibo Valentia',3),(106,'Vicenza',20),(107,'Viterbo',7);
/*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regione`
--

DROP TABLE IF EXISTS `regione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regione` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regione`
--

LOCK TABLES `regione` WRITE;
/*!40000 ALTER TABLE `regione` DISABLE KEYS */;
INSERT INTO `regione` VALUES (1,'Abruzzo'),(2,'Basilicata'),(3,'Calabria'),(4,'Campania'),(5,'Emilia-Romagna'),(6,'Friuli Venezia Giulia'),(7,'Lazio'),(8,'Liguria'),(9,'Lombardia'),(10,'Marche'),(11,'Molise'),(12,'Piemonte'),(13,'Puglia'),(14,'Sardegna'),(15,'Sicilia'),(16,'Toscana'),(17,'Trentino-Alto Adige'),(18,'Umbria'),(19,'Valle d\'Aosta'),(20,'Veneto');
/*!40000 ALTER TABLE `regione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES ('2021-05-10');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-13  9:15:30
