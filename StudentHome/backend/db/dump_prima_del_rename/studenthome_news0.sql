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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titolo` varchar(255) NOT NULL,
  `contenuto` text DEFAULT NULL,
  `data_pubblicazione` datetime DEFAULT current_timestamp(),
  `foto_news` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Nuovi appartamenti disponibili!','Scopri le ultime offerte vicino al centro.','2023-12-20 10:00:00','news1.jpeg'),(2,'Promozione Natale','Sconti fino al 20% su alcune stanze per studenti.','2023-12-18 09:30:00','news2.jpeg'),(3,'Da oggi StudentHome è anche su mobile!','Siamo entusiasti di annunciare una grande novità:\n\nStudentHome è finalmente disponibile anche su dispositivi mobile! \n\nLa nostra piattaforma è stata ottimizzata per offrirti un’esperienza semplice, fluida e accessibile direttamente dal tuo smartphone o tablet.\n\nChe tu sia in viaggio, in pausa tra le lezioni o comodamente seduto sul divano, potrai cercare appartamenti o camere in affitto con la stessa facilità della versione desktop. Navigare tra gli annunci, salvare le tue opzioni preferite e contattare i proprietari non è mai stato così comodo e veloce.\n\nNon importa dove ti trovi: con StudentHome la tua nuova casa è sempre a portata di mano. Prova subito la nostra versione mobile e scopri quanto è facile trovare il tuo prossimo alloggio!','2025-01-13 08:08:08','news3.jpg'),(4,'Qualche imperdibile notizia!','StudentHome è lieta di annunciare una nuova partnership con il Cinema Aurora! \n\nA partire da oggi, tutti gli studenti registrati sulla nostra piattaforma potranno beneficiare di uno sconto del 20% sui biglietti per i film in programmazione.\n\nChe tu voglia rilassarti dopo una lunga giornata di studio o organizzare una serata con i coinquilini, questa è l’occasione perfetta per vivere momenti di svago a prezzi vantaggiosi.\n\nNon dimenticare di mostrare il tuo badge digitale StudentHome alla cassa per ottenere lo sconto.\n\nBuona visione!','2025-01-13 08:08:08','news4.jpg');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-16 10:46:02
