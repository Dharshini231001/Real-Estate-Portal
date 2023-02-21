-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 08, 2022 at 10:59 AM
-- Server version: 8.0.18
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realestate`
--

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `sellerid` int(11) NOT NULL,
  `propertyid` int(11) NOT NULL,
  `createdat` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `sellerid` int(11) NOT NULL,
  `sellername` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `selleremail` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `sellerphone` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `selleraddress` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `area` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `propertytype` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `bedrooms` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `bathrooms` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `askingprice` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdat` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `salesrequest`
--

CREATE TABLE `salesrequest` (
  `id` int(11) NOT NULL,
  `buyername` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `buyerid` int(11) NOT NULL,
  `sellerid` int(11) NOT NULL,
  `propertyid` int(11) NOT NULL,
  `createdat` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `usertype` varchar(15) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'buyer',
  `createdat` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `usertype`, `createdat`) VALUES
(5, 'Ganesh Seller', 'admin2@gmail.com', '12345', 'admin', '2022-11-07 04:13:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salesrequest`
--
ALTER TABLE `salesrequest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salesrequest`
--
ALTER TABLE `salesrequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
