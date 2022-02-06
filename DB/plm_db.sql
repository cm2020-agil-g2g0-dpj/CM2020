-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2022 at 03:08 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `assemblies`
--

CREATE TABLE `assemblies` (
  `Assembly_ID` int(11) NOT NULL,
  `Part_ID` int(11) NOT NULL,
  `Revision_ID` int(11) NOT NULL,
  `Part_Quantity` int(11) NOT NULL,
  `Assembly_Name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `parts`
--

CREATE TABLE `parts` (
  `Part_ID` int(11) NOT NULL,
  `Part_Name` text NOT NULL,
  `Part_Created_Date` date NOT NULL,
  `Part_Description` text NOT NULL,
  `Part_Specification_Link` text NOT NULL,
  `Part_Issues` text NOT NULL,
  `Part_Notes` text NOT NULL,
  `Part_Design_Status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `revision_history`
--

CREATE TABLE `revision_history` (
  `Revision_ID` int(11) NOT NULL,
  `Part_ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Approved_For_Release` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `username`, `password`) VALUES
(1, 'Jibin Joseph', 'jibinthayyil@gmail.com', 'jibin', 'password'),
(2, 'Abin Joseph', 'abinjoseph06@gmail.com', 'abin', 'pwd'),
(6, 'bryce', 'fake@fake.com', 'bryce', 'password'),
(7, 'bryce', 'fake@fake.com', 'bryce', 'password');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assemblies`
--
ALTER TABLE `assemblies`
  ADD PRIMARY KEY (`Assembly_ID`),
  ADD KEY `Part_ID` (`Part_ID`);

--
-- Indexes for table `parts`
--
ALTER TABLE `parts`
  ADD PRIMARY KEY (`Part_ID`),
  ADD KEY `Part_Name` (`Part_Name`(768));

--
-- Indexes for table `revision_history`
--
ALTER TABLE `revision_history`
  ADD PRIMARY KEY (`Revision_ID`),
  ADD KEY `Part_ID` (`Part_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assemblies`
--
ALTER TABLE `assemblies`
  ADD CONSTRAINT `assemblies_ibfk_1` FOREIGN KEY (`Part_ID`) REFERENCES `parts` (`Part_ID`),
  ADD CONSTRAINT `assemblies_ibfk_2` FOREIGN KEY (`Assembly_ID`) REFERENCES `parts` (`Part_ID`);

--
-- Constraints for table `revision_history`
--
ALTER TABLE `revision_history`
  ADD CONSTRAINT `revision_history_ibfk_1` FOREIGN KEY (`Part_ID`) REFERENCES `parts` (`Part_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
