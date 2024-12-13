-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1:3306
-- 產生時間： 2024-12-07 10:14:59
-- 伺服器版本： 8.0.31
-- PHP 版本： 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `test1207`
--

-- --------------------------------------------------------

--
-- 資料表結構 `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message` varchar(1024) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `message`
--

INSERT INTO `message` (`id`, `user_id`, `message`, `created_at`) VALUES
(1, 1, 'ragbfdab', '2024-12-07 09:12:12'),
(2, 2, 'bnaefdf', '2024-12-07 09:12:12'),
(3, 7, '測試', '2024-12-07 18:09:51');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `password` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `account`, `password`) VALUES
(1, 'test', '123456'),
(2, 'test123', '123456'),
(3, 'test1', '$argon2id$v=19$m=65536,t=3,p=4$pYG5+6CjI0dskCEQaHSDPg$CC6Ji6Xz9yqE8IaE2iPTGsNB588KxVJkRVKge4qWDGE'),
(4, 'test2', '123456'),
(5, 'test3', '123456'),
(6, 'test5', '$argon2id$v=19$m=65536,t=3,p=4$4HBQgPAPzmQCEBSHApC9PA$NoweC179/SLtxNZerIO96AAW1lqM8mfDnShK3fOChhI'),
(7, 'test6', '$argon2id$v=19$m=65536,t=3,p=4$XT0ecJDkMRlN35FyvE7kQw$ZsHeLOCFPmKJyfOPAC6cQvY3QRMmYcAviUmi1xQPeDk');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
