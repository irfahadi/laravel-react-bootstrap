-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2021 at 05:21 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `jadwals`
--

CREATE TABLE `jadwals` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id` int(11) NOT NULL,
  `jadwal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jadwals`
--

INSERT INTO `jadwals` (`created_at`, `updated_at`, `id`, `jadwal`) VALUES
('2021-05-09 15:14:18', '2021-05-11 08:54:27', 1, '2021-05-11'),
('2021-05-15 00:24:39', '2021-05-15 00:24:39', 2, '2021-05-09'),
('2021-05-15 00:25:46', '2021-05-15 00:25:46', 3, '2021-05-16'),
('2021-05-15 00:27:05', '2021-05-15 00:27:05', 4, '2021-05-17'),
('2021-05-15 00:31:31', '2021-05-15 00:31:31', 5, '2021-05-18');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(4, '2018_08_01_000000_create_users_table', 1),
(5, '2018_08_02_000000_create_password_resets_table', 1),
(6, '2018_08_03_000000_create_todos_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ttl` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sekolah` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jadwal_id` int(11) NOT NULL,
  `nilai_dasar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai_1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai_2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai_3` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai_4` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profil` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `akte` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`created_at`, `updated_at`, `id`, `user_id`, `nama`, `ttl`, `sekolah`, `telepon`, `alamat`, `unit`, `status`, `jadwal_id`, `nilai_dasar`, `nilai_1`, `nilai_2`, `nilai_3`, `nilai_4`, `profil`, `akte`) VALUES
('2021-05-01 13:28:26', '2021-05-23 07:54:30', 1, 1, 'Irfan Fahmi Ahmadi', 'Puralaksana, 03 Juni 1997', 'Smansaga', '08080808080', 'Jl. Lintas Liwa gg. Pasar Kamis', 'Lampung Barat', 'Tingkat Dasar', 2, 'Profile.pdf', 'tis', '0', '0', '0', 'images/react.jpeg', 'images/react.jpeg'),
('2021-05-02 22:38:49', '2021-05-23 07:54:54', 2, 7, 'Irfan Fahmi', 'Puralaksana, 03 Juni 1997', 'SMANSAGA', '09090909090', 'jln', 'Way Tenong', 'Tingkat Dasar', 2, '', '', '', '', '', 'C:\\fakepath\\98984.jpg', 'C:\\fakepath\\98984.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `peserta_created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`created_at`, `updated_at`, `id`, `name`, `email`, `password`, `remember_token`, `email_verified_at`, `peserta_created_at`) VALUES
('2021-04-28 13:37:18', '2021-04-28 13:37:18', 1, 'User Test', 'user@test.dev', '$2y$10$E.8xIkjkXzc6q6fnE1mddexKyxosezhoD.ghUk0simP..Dkn/fraG', NULL, '2021-05-01 03:12:45', '2021-05-23 13:33:25'),
('2021-04-28 13:37:18', '2021-05-14 23:44:04', 2, 'Austin Durgan II', 'kellen.kuhn@example.org', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', NULL, '2021-05-14 23:44:04', NULL),
('2021-04-28 13:37:18', '2021-05-14 23:45:33', 3, 'Theodora Buckridge', 'hilbert.cummerata@example.org', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', NULL, '2021-05-14 23:45:33', NULL),
('2021-04-28 13:37:18', '2021-05-14 23:45:50', 4, 'Mr. Vernon Stokes', 'feeney.daija@example.net', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', NULL, '2021-05-14 23:45:50', NULL),
('2021-04-28 13:37:18', '2021-05-14 23:51:35', 5, 'Mary Fahey', 'clifford.johns@example.net', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', NULL, '2021-05-14 23:51:35', NULL),
('2021-04-28 13:37:18', '2021-05-16 14:53:24', 6, 'Mr. Buddy King', 'dovie40@example.net', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', NULL, '2021-05-16 14:53:24', NULL),
('2021-04-28 16:03:53', '2021-04-28 16:03:53', 7, 'agas', 'irfangamer@gmail.com', '$2y$10$TLqBVJtsh/Rip2sNP5uCku19cUvxhk.ALgGCGSx2lOOTNxMOPvP.u', NULL, '2021-05-02 07:19:07', '2021-05-23 13:33:33'),
('2021-05-23 05:21:01', '2021-05-23 05:21:01', 8, 'ncang', 'ncang@ncing.com', '$2y$10$3c9CithlOfdRw90jZs/7AOMenJVDzBGLiqCj2lnsM4Os1mcxyyD8u', NULL, '2021-05-23 05:21:16', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jadwals`
--
ALTER TABLE `jadwals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jadwals`
--
ALTER TABLE `jadwals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
