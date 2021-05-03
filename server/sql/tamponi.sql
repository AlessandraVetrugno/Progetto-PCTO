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
  `codice` int(11) NOT NULL,
  `password` varchar(150) NOT NULL,
  `id_presidio` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `amministratore_presidio_codice_uindex` (`codice`),
  KEY `amministratore_presidio_presidio_id_fk` (`id_presidio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amministratore_presidio`
--

LOCK TABLES `amministratore_presidio` WRITE;
/*!40000 ALTER TABLE `amministratore_presidio` DISABLE KEYS */;
/*!40000 ALTER TABLE `amministratore_presidio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amministratore_sistema`
--

DROP TABLE IF EXISTS `amministratore_sistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amministratore_sistema` (
  `id` int(11) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `codice` int(11) NOT NULL,
  `password` varchar(150) NOT NULL,
  UNIQUE KEY `amministratore_sistema_codice_uindex` (`codice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amministratore_sistema`
--

LOCK TABLES `amministratore_sistema` WRITE;
/*!40000 ALTER TABLE `amministratore_sistema` DISABLE KEYS */;
INSERT INTO `amministratore_sistema` VALUES (1,'fede',1111,'$2y$10$Iz0Z7v0.HMgoC2Exgqwckuj2jglWaOuq30p2CDsbYWOrB5CAW26OK');
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
  `codice` int(11) NOT NULL,
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
INSERT INTO `operatore_sanitario` VALUES (1,'Gino Bartali',1000000001,'$2y$10$0C02N4M1sZptM09pPxpHP.05o3slXbxfTZ9N7yQYWeWjVpKQJtE2S',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prenotazione`
--

LOCK TABLES `prenotazione` WRITE;
/*!40000 ALTER TABLE `prenotazione` DISABLE KEYS */;
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
  `indirizzo` varchar(255) NOT NULL,
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
INSERT INTO `presidio` VALUES (1,'Centro Volta','Via della Volta',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia`
--

LOCK TABLES `provincia` WRITE;
/*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
INSERT INTO `provincia` VALUES (1,'Brescia',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regione`
--

LOCK TABLES `regione` WRITE;
/*!40000 ALTER TABLE `regione` DISABLE KEYS */;
INSERT INTO `regione` VALUES (1,'Lombardia');
/*!40000 ALTER TABLE `regione` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-03  9:19:59
