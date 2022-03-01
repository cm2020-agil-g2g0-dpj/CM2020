-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2022 at 08:35 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

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
  `Index` int(11) NOT NULL,
  `Assembly_ID` int(11) NOT NULL,
  `Part_ID` int(11) NOT NULL,
  `Revision_ID` int(11) NOT NULL,
  `Part_Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assemblies`
--

INSERT INTO `assemblies` (`Index`, `Assembly_ID`, `Part_ID`, `Revision_ID`, `Part_Quantity`) VALUES
(6, 7, 1, 1, 1),
(7, 7, 1, 1, 2),
(8, 7, 2, 1, 2),
(12, 8, 3, 2, 1),
(13, 8, 4, 1, 2),
(14, 8, 5, 1, 2),
(15, 9, 8, 2, 2),
(16, 9, 6, 1, 1),
(17, 9, 5, 1, 4),
(18, 10, 7, 1, 2),
(19, 10, 9, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `parts`
--

CREATE TABLE `parts` (
  `Part_ID` int(11) NOT NULL,
  `Part_Name` text NOT NULL,
  `Part_Created_Date` date NOT NULL DEFAULT current_timestamp(),
  `Part_Description` text NOT NULL,
  `Part_Specification_Link` text NOT NULL,
  `Part_Issues` text NOT NULL,
  `Part_Notes` text NOT NULL,
  `Part_Design_Status` text NOT NULL,
  `Part_Owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parts`
--

INSERT INTO `parts` (`Part_ID`, `Part_Name`, `Part_Created_Date`, `Part_Description`, `Part_Specification_Link`, `Part_Issues`, `Part_Notes`, `Part_Design_Status`, `Part_Owner`) VALUES
(1, '1-1000', '2022-02-15', 'Handle body', '', 'Handle cracking', '', 'Issued, revision in work', 1),
(2, '2-1000', '2022-02-13', 'Screw', '', '', '', 'Issued', 1),
(3, '2-1001', '2022-02-13', 'Washer', '', '', '', 'Issued', 1),
(4, '1-1001', '2022-02-13', 'Door', '', '', 'Looking for alternative material', 'Issued, revision in work', 6),
(5, '2-1002', '2022-02-13', 'Hinge', '', 'Hinge sticking', '', 'Issued, revision not started', 6),
(6, '2-1003', '2022-02-13', 'Screw', '', '', '', 'Issued', 6),
(7, '1-1003', '2022-02-13', 'Cabinet body', '', '', '', 'Issued', 8),
(8, '0-1000', '2022-02-13', 'Handle Assembly', '', '', '', 'Issued', 9),
(9, '0-1001', '2022-02-13', 'Door Assembly', '', '', 'Changing alignment of hinge', 'Issued, revision in work', 9),
(10, '0-1002', '2022-02-13', 'Cabinet with Door', '', '', '', 'Issued', 9),
(11, '0-1003', '2022-02-13', 'Cabinet with handle', '', '', '', 'Issued', 8),
(16, '1-1004', '2022-03-02', 'Part Description', 'Part Specification Link', 'Part Issue', 'Part Notes', 'Issued', 1),
(17, '4-1003', '2022-03-02', 'Part Description', 'Part Specification Link 4', 'Part Issue', 'Part Notes', 'Issued - Revision not started', 1),
(18, '1-1005', '2022-03-02', 'Part Description', 'Part Specification Link 5', 'Part Issue', 'Part Notes', 'Issued', 1);

-- --------------------------------------------------------

--
-- Table structure for table `revision_history`
--

CREATE TABLE `revision_history` (
  `Revision_ID` int(11) NOT NULL,
  `Part_ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Approved_For_Release` binary(1) NOT NULL,
  `Approved_by` int(11) NOT NULL
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
(8, 'Vicus', 'vicus@fake.com', 'vicus', 'password'),
(9, 'Chaan', 'chaan@fake.com', 'chaan', 'password');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assemblies`
--
ALTER TABLE `assemblies`
  ADD PRIMARY KEY (`Index`),
  ADD KEY `Part_ID` (`Part_ID`),
  ADD KEY `Revision_ID` (`Revision_ID`),
  ADD KEY `Assembly_ID` (`Assembly_ID`);

--
-- Indexes for table `parts`
--
ALTER TABLE `parts`
  ADD PRIMARY KEY (`Part_ID`),
  ADD KEY `Part_Name` (`Part_Name`(768)),
  ADD KEY `part_owner` (`Part_Owner`),
  ADD KEY `part_owner_2` (`Part_Owner`);

--
-- Indexes for table `revision_history`
--
ALTER TABLE `revision_history`
  ADD PRIMARY KEY (`Revision_ID`),
  ADD KEY `Part_ID` (`Part_ID`),
  ADD KEY `Approved_by` (`Approved_by`),
  ADD KEY `Part_ID_2` (`Part_ID`),
  ADD KEY `Approved_by_2` (`Approved_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assemblies`
--
ALTER TABLE `assemblies`
  MODIFY `Index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `parts`
--
ALTER TABLE `parts`
  MODIFY `Part_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `revision_history`
--
ALTER TABLE `revision_history`
  MODIFY `Revision_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assemblies`
--
ALTER TABLE `assemblies`
  ADD CONSTRAINT `assemblyid` FOREIGN KEY (`Assembly_ID`) REFERENCES `parts` (`Part_ID`),
  ADD CONSTRAINT `partid` FOREIGN KEY (`Part_ID`) REFERENCES `parts` (`Part_ID`);

--
-- Constraints for table `parts`
--
ALTER TABLE `parts`
  ADD CONSTRAINT `parts_ibfk_1` FOREIGN KEY (`Part_owner`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `revision_history`
--
ALTER TABLE `revision_history`
  ADD CONSTRAINT `revision_history_ibfk_2` FOREIGN KEY (`Approved_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `revision_history_ibfk_3` FOREIGN KEY (`Revision_ID`) REFERENCES `assemblies` (`Revision_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
