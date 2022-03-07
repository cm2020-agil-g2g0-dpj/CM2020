-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1

-- Generation Time: Mar 06, 2022 at 02:38 PM
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
(1, 2, 1, 1, 1),
(2, 3, 1, 1, 1),
(3, 4, 1, 1, 1),
(4, 5, 1, 1, 1),
(5, 6, 1, 1, 1),
(6, 7, 1, 1, 1),
(7, 8, 1, 1, 1),
(8, 9, 1, 1, 1);

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
  `Part_Design_Status` text NOT NULL,
  `Part_owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parts`
--


INSERT INTO `parts` (`Part_ID`, `Part_Name`, `Part_Created_Date`, `Part_Description`, `Part_Specification_Link`, `Part_Issues`, `Part_Notes`, `Part_Design_Status`, `Part_Owner`) VALUES
(1, '1-1000', '2022-02-15', 'Handle body', 'Part Specification Link6', 'Handle cracking', 'Handle cracking - cleared issue', 'Issued', 1),
(2, '2-1000', '2022-02-13', 'Screw', 'Part Specification Link 7', 'Screw issue', 'Screw issue cleared', 'Issued - Revision in work', 1),
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
  `Date` date NOT NULL DEFAULT current_timestamp(),
  `Part_Notes_Rev` varchar(256) NOT NULL,
  `Approved_For_Release` binary(1) NOT NULL,
  `Approved_By` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `revision_history`
--

INSERT INTO `revision_history` (`Revision_ID`, `Part_ID`, `Date`, `Part_Notes_Rev`, `Approved_For_Release`, `Approved_By`) VALUES
(1, 1, '2022-03-06', 'Handle cracking - cleared issue', 0x31, 1),
(2, 2, '2022-03-06', 'Screw issue cleared', 0x31, 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(64) NOT NULL,
  `privilege` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `privilege`) VALUES
(1, 'Admin', 'View, Edit, Delete'),
(2, 'Editor', 'View, Edit'),
(3, 'Basic', 'View');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `username`, `password`, `role`) VALUES
(1, 'Jibin Joseph', 'jibinthayyil@gmail.com', 'jibin', 'CP4UBkKU6XZ#m', 1),
(2, 'Abin Joseph', 'abinjoseph06@gmail.com', 'abin', 'pwd', 3),
(6, 'bryce', 'fake@fake.com', 'bryce', 'password', 3),
(8, 'Vicus', 'vicus@fake.com', 'vicus', 'password', 1),
(9, 'Chaan', 'chaan@fake.com', 'chaan', 'password', 3);

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
  ADD KEY `part_owner` (`Part_owner`),
  ADD KEY `part_owner_2` (`Part_owner`);

--
-- Indexes for table `revision_history`
--
ALTER TABLE `revision_history`
  ADD PRIMARY KEY (`Revision_ID`),
  ADD KEY `Part_ID` (`Part_ID`),
  ADD KEY `Approved_by` (`Approved_By`),
  ADD KEY `Part_ID_2` (`Part_ID`),
  ADD KEY `Approved_by_2` (`Approved_By`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `rolefk` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assemblies`
--
ALTER TABLE `assemblies`
  MODIFY `Index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `revision_history`
--
ALTER TABLE `revision_history`
  MODIFY `Revision_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `assemblies_ibfk_1` FOREIGN KEY (`Part_ID`) REFERENCES `parts` (`Part_ID`),
  ADD CONSTRAINT `assemblies_ibfk_2` FOREIGN KEY (`Assembly_ID`) REFERENCES `parts` (`Part_ID`);

--
-- Constraints for table `parts`
--
ALTER TABLE `parts`
  ADD CONSTRAINT `parts_ibfk_1` FOREIGN KEY (`Part_owner`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `revision_history`
--
ALTER TABLE `revision_history`
  ADD CONSTRAINT `revision_history_ibfk_2` FOREIGN KEY (`Approved_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `rolefk` FOREIGN KEY (`role`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
