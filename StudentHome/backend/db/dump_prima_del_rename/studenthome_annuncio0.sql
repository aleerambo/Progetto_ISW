-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: studenthome
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `annuncio`
--

DROP TABLE IF EXISTS `annuncio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annuncio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `utente_id` int(11) NOT NULL,
  `id_quartiere` int(11) DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp(),
  `prezzo` decimal(10,2) NOT NULL,
  `descrizione` text DEFAULT NULL,
  `locali` int(11) DEFAULT NULL,
  `mq` int(11) DEFAULT NULL,
  `piano` int(11) DEFAULT NULL,
  `indirizzo` varchar(255) DEFAULT NULL,
  `stato` enum('attivo','non attivo') DEFAULT 'non attivo',
  `foto_annuncio` text DEFAULT NULL,
  `thumbnails` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `utente_id` (`utente_id`),
  CONSTRAINT `annuncio_ibfk_1` FOREIGN KEY (`utente_id`) REFERENCES `utente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annuncio`
--

LOCK TABLES `annuncio` WRITE;
/*!40000 ALTER TABLE `annuncio` DISABLE KEYS */;
INSERT INTO `annuncio` VALUES (1,1,1,'2025-01-02 09:00:00',500.00,'Camera singola vicino al centro.',1,20,2,'via nervi 10, cesena','attivo','Appartamento1.jpeg','Appartamento1.jpeg, Appartamento2.jpeg'),(2,2,2,'2023-12-12 11:30:00',800.00,'Appartamento bilocale arredato.',2,60,1,'Via Cerchia di Sant\'Egidio, 807, Cesena','attivo','Appartamento2.jpeg','Appartamento1.jpeg, Appartamento2.jpeg'),(3,1,3,'2023-12-05 15:00:00',300.00,'Posto letto in stanza doppia.',1,15,3,'Via Portofino, 280, Cesena','attivo','postoletto.jpeg','Appartamento1.jpeg, Appartamento2.jpeg'),(9,17,NULL,'2025-01-15 18:34:11',500.00,'Ampio appartamento in zona Ippodromo',4,60,0,'Via L.C. Farini, 380','attivo',NULL,NULL),(10,17,4,'2025-01-16 10:24:33',270.00,'Pippo Baudo',6,20,200,'via stromboli 10, Cesena','non attivo',NULL,NULL);
/*!40000 ALTER TABLE `annuncio` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-16 10:46:03
