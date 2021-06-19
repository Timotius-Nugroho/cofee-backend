-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2021 at 11:56 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffee_express_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `invoice_number` varchar(250) NOT NULL,
  `invoice_promo_code` varchar(250) NOT NULL,
  `invoice_subtotal` int(50) NOT NULL,
  `payment_method` varchar(150) NOT NULL,
  `order_status` enum('pending','done') NOT NULL,
  `invoice_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` varchar(150) NOT NULL,
  `qty` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `order_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_updatet_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_category` enum('fav','coffee','noncoffee','foods','addon') NOT NULL,
  `product_size` enum('A','B') NOT NULL,
  `product_desc` varchar(250) NOT NULL,
  `product_image` varchar(250) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_updatet_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_category`, `product_size`, `product_desc`, `product_image`, `product_created_at`, `product_updatet_at`) VALUES
(2, 'Vanila Latte', 25000, 'coffee', 'A', 'Cold brewing is a method of brewing that combines ground coffee and cool water', '2021-06-18T16-08-18.245ZMask Group (5).png', '2021-06-18 16:08:18', NULL),
(3, 'Somay', 10000, 'foods', 'B', 'Somay mantap', '2021-06-18T16-10-11.877ZMask Group (5).png', '2021-06-18 16:10:11', NULL),
(4, 'Gado-gado', 20000, 'foods', 'B', 'gado gado mantap', '2021-06-18T16-38-39.035ZMask Group (5).png', '2021-06-18 16:38:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `promo`
--

CREATE TABLE `promo` (
  `promo_id` int(11) NOT NULL,
  `promo_name` varchar(250) NOT NULL,
  `promo_code` varchar(250) NOT NULL,
  `promo_discount` int(11) NOT NULL,
  `promo_desc` int(11) NOT NULL,
  `expire_start` timestamp NULL DEFAULT NULL,
  `expire_end` timestamp NULL DEFAULT NULL,
  `min_total_price` int(11) NOT NULL,
  `max_discount` int(11) NOT NULL,
  `promo_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `promo_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_display_name` varchar(100) NOT NULL,
  `user_first_name` varchar(250) NOT NULL,
  `user_last_name` varchar(150) NOT NULL,
  `user_role` varchar(100) NOT NULL DEFAULT '''customer''',
  `user_address` varchar(250) NOT NULL,
  `user_gender` enum('male','female') NOT NULL,
  `user_birthday` date NOT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_phone` varchar(50) NOT NULL,
  `user_image` varchar(250) NOT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_verification` tinyint(4) NOT NULL DEFAULT 0,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_display_name`, `user_first_name`, `user_last_name`, `user_role`, `user_address`, `user_gender`, `user_birthday`, `user_email`, `user_phone`, `user_image`, `user_password`, `user_verification`, `user_created_at`, `user_updated_at`) VALUES
(2, '', '', '', 'customer', 'jl. buntu1', 'male', '0000-00-00', 'user1@email.com', '02947204704', '', '$2b$10$BHfsnIbbirTA9zRfLdHhMenEsfXFHf4vz2J3YQEMq9HLdAbtVZ5H2', 0, '2021-06-18 12:37:35', NULL),
(4, '', '', '', 'admin', '', 'male', '0000-00-00', 'timotiusnugroho999@gmail.com', '222223', '', '$2b$10$ganFpb0O5247dDROyN.aQesSfNNddC/gqFf240NkO897XnSZL.MQO', 1, '2021-06-18 12:41:33', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`promo_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `promo`
--
ALTER TABLE `promo`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
