-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2025 at 01:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `suxinfurniture`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_contract`
--

CREATE TABLE `tb_contract` (
  `con_id` int(11) NOT NULL,
  `con_address` longtext NOT NULL,
  `con_line` longtext NOT NULL,
  `con_tel` longtext NOT NULL,
  `con_linkaddress` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_contract`
--

INSERT INTO `tb_contract` (`con_id`, `con_address`, `con_line`, `con_tel`, `con_linkaddress`) VALUES
(1, 'ถ. ศรีนครินทร์ แขวงหนองบอน เขตประเวศ กรุงเทพมหานคร 10250', 'suxin', '092-296-3667', 'https://www.google.com/maps/embed?pb=!4v1737827409166!6m8!1m7!1sL16dvtxvakbpcJOOQ-9bUw!2m2!1d13.6464239365209!2d100.6378252319085!3f293.47!4f-2.2099999999999937!5f0.9545365120893359');

-- --------------------------------------------------------

--
-- Table structure for table `tb_order`
--

CREATE TABLE `tb_order` (
  `order_id` int(11) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `order_detail` longtext NOT NULL,
  `order_size` varchar(255) NOT NULL COMMENT 'ขนาด',
  `order_price` varchar(255) NOT NULL COMMENT 'ราคา',
  `order_shell` varchar(255) NOT NULL COMMENT 'ลดราคา',
  `order_type` int(11) NOT NULL,
  `order_img` varchar(255) NOT NULL,
  `order_img2` varchar(255) NOT NULL,
  `order_img3` varchar(255) NOT NULL,
  `order_vdio` varchar(255) NOT NULL,
  `order_status` enum('1','0') NOT NULL DEFAULT '1' COMMENT '''1=มีสินค้า'',''0=สินค้าหมด'''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_order`
--

INSERT INTO `tb_order` (`order_id`, `order_code`, `order_detail`, `order_size`, `order_price`, `order_shell`, `order_type`, `order_img`, `order_img2`, `order_img3`, `order_vdio`, `order_status`) VALUES
(1, 'T1001', 'สินค้ามีปัญหาแตกหักระหว่างการขนส่ง สามารถคืนของผ่านแอพได้ค่ะ ไม่มีค่าใช้จ่ายเพิ่มเติม ลูกค้าจะได้รับเงินเต็มจำนวนค่ะ \r\nคืนสินค้าได้ภายใน7วันเท่านั้น\r\nสินค้ามีน้ำหนักเยอะค่าส่งคิดตามจริงค่ะ จัดส่งขนส่งเคอรี่ ทางร้านแพ็กให้อย่างดีค่ะ 1-4วันได้รับของทางร้านขออนุญาตจัดส่งตามคิวที่กดสั่งนะคะ', '65*35*60', '3000', '2700', 1, 'T1.jpeg', 'T2.jpeg', 'T3.jpeg', 'V1.mp4', '0'),
(2, 'T2001', 'TTTTT2222', '', '4500', '', 2, 'T2.jpeg', '', '', '', '1'),
(3, 'T3001', 'T3asdsadas', '', '1000', '', 3, 'T3.jpeg', '', '', '', '1'),
(4, 'T4001', 'รายละเอียดดดดดดดด', '', '3500', '', 4, 'T4.jpeg', '', '', '', '1'),
(36, 'T32432', '', '', '20444', '122', 17, '1穿插.jpeg', '', '', '', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tb_type`
--

CREATE TABLE `tb_type` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(255) NOT NULL,
  `type_status` enum('1','0') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_type`
--

INSERT INTO `tb_type` (`type_id`, `type_name`, `type_status`) VALUES
(1, 'เคาท์เตอร์ครัว', '1'),
(2, 'ตู้เสื้อผ้า', '1'),
(3, 'ตู้เสือผ้าพร้อมโต๊ะหนังสือ', '1'),
(4, 'เตียง', '1'),
(5, 'ตู้เก็บไวน์', '1'),
(6, 'ชั้นวางทีวี', '1'),
(7, 'ตู้เก็บของ', '1'),
(8, 'ตู้โชว์', '1'),
(9, 'ชั้นวางของ/ชั้นลอย', '1'),
(10, 'ตู้ไซด์บอร์ด', '1'),
(11, 'ตู้/ชั้นรองเท้า', '1'),
(12, 'ชั้นวางคร่อมเครื่องซักผ้า', '1'),
(13, 'ชั้นใต้บันได', '1'),
(14, 'โต๊ะกินข้าว', '1'),
(17, 'โต๊ะทำงาน', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `user_id` int(11) NOT NULL,
  `user_username` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_surname` varchar(255) NOT NULL,
  `user_tel` varchar(255) NOT NULL,
  `user_level` enum('member','admin') NOT NULL DEFAULT 'member'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`user_id`, `user_username`, `user_password`, `user_name`, `user_surname`, `user_tel`, `user_level`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Admin', 'Tae', '123456789', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_contract`
--
ALTER TABLE `tb_contract`
  ADD PRIMARY KEY (`con_id`);

--
-- Indexes for table `tb_order`
--
ALTER TABLE `tb_order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `tb_type`
--
ALTER TABLE `tb_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_contract`
--
ALTER TABLE `tb_contract`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_order`
--
ALTER TABLE `tb_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `tb_type`
--
ALTER TABLE `tb_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
