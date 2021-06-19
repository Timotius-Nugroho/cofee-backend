-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Jun 2021 pada 16.15
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffee`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `invoice`
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

--
-- Dumping data untuk tabel `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `user_id`, `invoice_number`, `invoice_promo_code`, `invoice_subtotal`, `payment_method`, `order_status`, `invoice_created_at`) VALUES
(14, 2, 'CS-802', 'XYZSS', 50000, 'OVO', 'done', '2021-06-18 16:06:43'),
(15, 2, 'CS-71337', 'XYZSS', 50000, 'OVO', 'pending', '2021-06-18 16:07:16'),
(16, 2, 'CS-91366', 'XYZSS', 50000, 'OVO', 'pending', '2021-06-18 16:07:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` varchar(50) NOT NULL,
  `qty` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `order_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `invoice_id`, `product_id`, `size`, `qty`, `total_price`, `order_created_at`) VALUES
(2, 2, 14, 2, 'R', 3, 20000, '2021-06-18 16:06:43'),
(3, 2, 14, 1, 'L', 4, 30000, '2021-06-18 16:06:43'),
(5, 2, 15, 2, 'R', 3, 20000, '2021-06-18 16:07:16'),
(6, 2, 15, 1, 'L', 4, 30000, '2021-06-18 16:07:16'),
(8, 2, 16, 2, 'R', 3, 20000, '2021-06-18 16:07:43'),
(9, 2, 16, 1, 'L', 4, 30000, '2021-06-18 16:07:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
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
  `product_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_category`, `product_size`, `product_desc`, `product_image`, `product_created_at`, `product_updated_at`) VALUES
(2, 'rice', 1000, 'foods', 'B', 'lorem ipsum', '', '2021-06-19 02:21:58', NULL),
(3, 'Somay', 10000, 'foods', 'B', 'Somay mantap', '2021-06-19T05-47-33.029Zimage11.png', '2021-06-19 05:44:09', '2021-06-19 14:04:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `promo`
--

CREATE TABLE `promo` (
  `promo_id` int(11) NOT NULL,
  `promo_name` varchar(250) NOT NULL,
  `promo_code` varchar(250) NOT NULL,
  `promo_discount` int(11) NOT NULL,
  `promo_desc` varchar(250) NOT NULL,
  `expire_start` timestamp NULL DEFAULT NULL,
  `expire_end` timestamp NULL DEFAULT NULL,
  `min_total_price` int(11) NOT NULL,
  `max_discount` int(11) NOT NULL,
  `promo_image` varchar(150) NOT NULL,
  `promo_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `promo_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `promo`
--

INSERT INTO `promo` (`promo_id`, `promo_name`, `promo_code`, `promo_discount`, `promo_desc`, `expire_start`, `expire_end`, `min_total_price`, `max_discount`, `promo_image`, `promo_created_at`, `promo_updated_at`) VALUES
(1, 'Hari batik', 'BATIK03', 20, 'lorem ipsum', '2020-03-01 17:00:00', '2030-04-08 17:00:00', 1000, 30000, '2021-06-19T14-08-43.280Zcannon.png', '2021-06-19 11:58:00', '2021-06-19 14:08:43'),
(2, 'hari kemerdekaan', 'MERDEKA02', 10, 'loerem ipsum', '2021-06-15 11:55:37', '2021-06-14 11:55:37', 2000, 80000, '', '2021-06-19 11:58:00', NULL),
(3, 'hari ibu', 'TANGGUH01', 30, 'lorem', '2021-06-24 11:58:37', '2021-06-26 11:58:37', 1000, 10000, '', '2021-06-19 11:59:16', NULL),
(5, 'Hari Pendidikan', 'DIDIK02', 20, 'lorem ipsum', '2020-03-01 17:00:00', '2030-04-08 17:00:00', 1000, 30000, '2021-06-19T14-12-49.121Zcannon.png', '2021-06-19 14:12:49', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_first_name` varchar(250) NOT NULL,
  `user_last_name` varchar(150) NOT NULL,
  `user_display_name` varchar(250) NOT NULL,
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
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_first_name`, `user_last_name`, `user_display_name`, `user_role`, `user_address`, `user_gender`, `user_birthday`, `user_email`, `user_phone`, `user_image`, `user_password`, `user_verification`, `user_created_at`, `user_updated_at`) VALUES
(2, 'lukas', 'q', '', 'customer', '', 'male', '0000-00-00', 'some@gamil.com', '222223', '', '$2b$10$BHfsnIbbirTA9zRfLdHhMenEsfXFHf4vz2J3YQEMq9HLdAbtVZ5H2', 0, '2021-06-18 12:37:35', NULL),
(4, 'graham', 'q', '', 'admin', '', 'male', '0000-00-00', 'timotiusnugroho999@gmail.com', '222223', '', '$2b$10$ganFpb0O5247dDROyN.aQesSfNNddC/gqFf240NkO897XnSZL.MQO', 1, '2021-06-18 12:41:33', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indeks untuk tabel `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`promo_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `promo`
--
ALTER TABLE `promo`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
