-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2023 a las 18:59:27
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_online`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` bigint(20) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritosproductos`
--

CREATE TABLE `carritosproductos` (
  `id_user` bigint(20) NOT NULL,
  `id_carrito` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_user` bigint(20) NOT NULL,
  `id_producto` bigint(20) NOT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallespedidos`
--

CREATE TABLE `detallespedidos` (
  `id_pedido` bigint(20) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `calle` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `piso` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `localidad` varchar(255) DEFAULT NULL,
  `codigo_postal` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detallespedidos`
--

INSERT INTO `detallespedidos` (`id_pedido`, `telefono`, `calle`, `numero`, `piso`, `ciudad`, `pais`, `localidad`, `codigo_postal`) VALUES
(1, 999999999, 'plaza mayor', '1', '3', 'Ciudad Real', 'España', 'Madrid', '13001'),
(2, 999999999, 'ancha', '43', '3', 'Ciudad Real', 'España', 'Miguelturra', '13170'),
(2, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(3, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(4, 999999999, 'ancha', '43', '3', 'Ciudad Real', 'España', 'Miguelturra', '13170'),
(5, 999999999, 'ancha', '43', '3', 'Ciudad Real', 'España', 'Miguelturra', '13170'),
(6, 999999999, 'plaza mayor', '1', '3', 'Ciudad Real', 'España', 'Madrid', '13001'),
(7, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(8, 999999999, 'ancha', '43', '3', 'Ciudad Real', 'España', 'Miguelturra', '13170'),
(9, 999999999, 'plaza mayor', '1', '3', 'Ciudad Real', 'España', 'Madrid', '13001'),
(10, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(11, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(12, 999999999, 'ancha', '43', '3', 'Ciudad Real', 'España', 'Miguelturra', '13170'),
(13, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(14, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(15, 999999999, 'ancha', '43', '3', 'Ciudad Real', 'España', 'Miguelturra', '13170'),
(16, 999999999, 'plaza mayor', '1', '3', 'Ciudad Real', 'España', 'Madrid', '13001'),
(17, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(18, 999999999, 'plaza mayor', '1', '3', 'Ciudad Real', 'España', 'Madrid', '13001'),
(19, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(20, 999999999, 'ancha', '43', '3', 'Ciudad Real', 'España', 'Miguelturra', '13170'),
(21, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(22, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(23, 999999999, 'plaza mayor', '1', '3', 'Ciudad Real', 'España', 'Madrid', '13001'),
(24, 999999999, 'ancha', '43', '3', 'Ciudad Real', 'España', 'Miguelturra', '13170'),
(25, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(26, 999999999, 'plaza mayor', '1', '3', 'Ciudad Real', 'España', 'Madrid', '13001'),
(27, 999999999, 'plaza españa', '50', '3', 'Madrid', 'España', 'Madrid', '28008'),
(28, 999999999, 'ancha', '43', '3', 'Ciudad Real', 'España', 'Miguelturra', '13170'),
(29, 999999999, 'plaza mayor', '1', '3', 'Ciudad Real', 'España', 'Madrid', '13001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disenoproductos`
--

CREATE TABLE `disenoproductos` (
  `id_diseno` bigint(20) NOT NULL,
  `id_producto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `disenoproductos`
--

INSERT INTO `disenoproductos` (`id_diseno`, `id_producto`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(3, 5),
(5, 6),
(5, 8),
(5, 9),
(4, 10),
(6, 11),
(7, 12),
(8, 13),
(8, 14),
(9, 19),
(9, 20),
(9, 21),
(10, 16),
(10, 17),
(11, 18),
(12, 15),
(13, 22),
(13, 23),
(13, 24),
(4, 7),
(27, 43),
(27, 44),
(27, 46),
(27, 51),
(27, 52),
(27, 53),
(35, 55),
(36, 56);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disenos`
--

CREATE TABLE `disenos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `tema` varchar(255) DEFAULT NULL,
  `estilo` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) NOT NULL,
  `activado` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `disenos`
--

INSERT INTO `disenos` (`id`, `titulo`, `imagen`, `tema`, `estilo`, `descripcion`, `activado`, `createdAt`, `updatedAt`) VALUES
(1, 'rainbow six siege', 'bbc3aaad-88f5-4c85-8025-21dc441c635c.jpg', 'videojuego', 'digital', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-10-29 19:51:08', '2023-10-29 19:51:08'),
(2, 'six siege', '3593bf43-7fa5-4fbe-a8fd-aad6547b1188.jpg', 'videojuego', 'mixto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-10-30 20:51:36', '2023-10-30 20:51:36'),
(3, 'siege', 'b9e4c77c-3505-46eb-be95-e800d3819e0e.jpg', 'libro', 'mixto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-11-02 21:40:13', '2023-10-30 21:40:13'),
(4, 'pulpo - Animal Crossing', '0ac258d5-e4a9-4426-86e4-1b6b2a361ebe.png', 'serie', 'digital', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 1, '2023-11-08 17:33:43', '2023-12-11 17:57:36'),
(5, 'pulpo comida - Animal Crossing', '6d2792b9-61f2-4e7b-a6f9-fefc981dd909.jpg', 'serie', 'digital', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-11-08 17:33:43', '2023-12-08 00:39:41'),
(6, 'planta - Genshin', '15c37c73-486c-489d-93d2-7e0f028d8f11.png', 'libro', 'mixto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-11-08 17:35:51', '2023-11-08 17:35:51'),
(7, 'planta verde - Genshin ', '018b5841-a307-4205-b956-4652990634f1.jpg', 'libro', 'digital', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-11-08 17:35:51', '2023-11-08 17:35:51'),
(8, 'planta flor', '75e04915-bee5-4e2a-8163-fcca954c726f.jpg', 'libro', 'tradicional', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 0, '2023-11-08 17:38:28', '2023-11-08 17:38:28'),
(9, 'conejo - Animal Crossing', '85ef2f8c-adfc-4e1d-a47d-e4ad110cf8cf.png', 'serie', 'digital', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-11-08 17:38:28', '2023-11-08 17:38:28'),
(10, 'planta bigote - Genshin Impact', '94faf177-b29a-49bf-b531-c557f801c8c2.png', 'libro', 'tradicional', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-11-08 17:40:39', '2023-11-08 17:40:39'),
(11, 'planta naranja - Genshin Impact', 'c60a4c61-d1c3-4d62-ad04-a14b97cfc4a3.jpg', 'libro', 'tradicional', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-11-08 17:40:39', '2023-11-08 17:40:39'),
(12, 'planta hoja - Genshin', 'c405b5e8-efe3-41a8-b8d1-1a39e2ebaeae.png', 'libro', 'mixto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-11-08 17:42:29', '2023-11-08 17:42:29'),
(13, 'ardilla - Animal Crossing', 'e4b84144-0e58-4e27-ad1d-81e06b2e619e.png', 'serie', 'tradicional', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, '2023-11-08 17:42:29', '2023-11-08 17:42:29'),
(21, 'ori', '6996a02b-1583-4f9d-b73d-123ea0c939a2.jpg', 'videojuego', 'digital', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 0, '2023-11-23 22:49:43', '2023-12-08 16:25:26'),
(22, 'hibana r6 siege', 'c22db05c-a318-4ef8-987d-566142bbeab1.jpg', 'videojuego', 'mixto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet facilisis magna etiam tempor orci eu lobortis. Sit amet mauris commodo quis imperdiet massa tincidunt nunc. Aenean euismod ele', 0, '2023-11-24 13:13:06', '2023-12-09 18:18:24'),
(23, 'tyutyu', 'd1592e8d-c6e3-4960-ae83-cc0cd1acb472.png', 'libro', 'tradicional', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, '2023-11-24 13:27:10', '2023-12-08 00:39:08'),
(24, 'plantita', '1c222857-9fe8-4ad2-9d8f-c683b7eb5b74.png', 'original', 'tradicional', 'plantitas, plantitas y más plantitas', 1, '2023-11-24 13:29:58', '2023-11-24 13:29:58'),
(25, 'planta pipa', '939ebdf9-82e1-469c-ae7c-6fa93c7cb612.png', 'original', 'tradicional', 'In sed vestibulum mauris. Vestibulum efficitur leo at nunc euismod, eget ullamcorper tellus molestie. Fusce vehicula magna erat, vel venenatis magna porta id. Maecenas id vehicula felis, vitae tempus libero. Sed non neque at sem ultricies mattis nec sed d', 1, '2023-11-25 19:57:54', '2023-11-25 19:57:54'),
(26, 'planta nuez', '692c9df7-a15d-4b42-8cfb-4c66c30fd3dd.png', 'original', 'tradicional', 'In sed vestibulum mauris. Vestibulum efficitur leo at nunc euismod, eget ullamcorper tellus molestie. Fusce vehicula magna erat, vel venenatis magna porta id. Maecenas id vehicula felis, vitae tempus libero. Sed non neque at sem ultricies mattis nec sed d', 1, '2023-11-25 19:58:49', '2023-11-25 19:58:49'),
(27, 'planta coco', '972f49a5-e998-4b7f-a2e9-b319c5b39534.png', 'original', 'tradicional', 'In sed vestibulum mauris. Vestibulum efficitur leo at nunc euismod, eget ullamcorper tellus molestie. Fusce vehicula magna erat, vel venenatis magna porta id. Maecenas id vehicula felis, vitae tempus libero. Sed non neque at sem ultricies mattis nec sed d', 1, '2023-11-25 19:59:26', '2023-11-25 19:59:26'),
(28, 'planta dama', 'f4353628-53b6-4862-8112-ed8432a86081.png', 'videojuego', 'tradicional', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, '2023-12-08 00:43:38', '2023-12-08 00:43:38'),
(29, 'mago palnta', 'd8f5ef35-1471-483a-9997-f2e05d77a018.png', 'libro', 'tradicional', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, '2023-12-08 00:45:43', '2023-12-08 00:45:51'),
(30, 'reina flor', '9fe4cdcc-7e77-4c97-9f3d-ecd08ab9dc06.png', 'libro', 'tradicional', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, '2023-12-08 00:52:04', '2023-12-08 00:52:04'),
(35, 'perro con león', '5309104b-434c-4583-87e1-b014fde143d8.png', 'musica', 'tradicional', 'yuri puri con su león de juguete favorito. ', 1, '2023-12-10 17:14:17', '2023-12-10 17:14:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disenosartistas`
--

CREATE TABLE `disenosartistas` (
  `id_user` bigint(20) NOT NULL,
  `id_diseno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `disenosartistas`
--

INSERT INTO `disenosartistas` (`id_user`, `id_diseno`) VALUES
(8, 1),
(8, 2),
(7, 3),
(18, 6),
(18, 7),
(18, 8),
(18, 9),
(18, 10),
(18, 11),
(18, 12),
(18, 13),
(18, 4),
(18, 5),
(18, 21),
(18, 22),
(18, 23),
(18, 24),
(18, 25),
(18, 26),
(18, 27),
(18, 28),
(18, 29),
(18, 30),
(18, 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id_user` bigint(20) NOT NULL,
  `id_diseno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id_user`, `id_diseno`) VALUES
(2, 1),
(2, 2),
(7, 3),
(2, 3),
(10, 6),
(11, 6),
(3, 8),
(2, 9),
(2, 8),
(2, 8),
(2, 10),
(2, 13),
(2, 21),
(2, 23),
(2, 25),
(2, 26),
(2, 27),
(2, 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `estado` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `id_cliente`, `id_producto`, `cantidad`, `fecha`, `estado`) VALUES
(1, 2, 23, 2, '2023-11-08 21:43:23', 'completado'),
(2, 2, 15, 3, '2023-11-10 21:43:23', 'completado'),
(3, 2, 23, 2, '2023-11-08 21:43:23', 'completado'),
(4, 2, 15, 3, '2023-12-10 21:43:23', 'completado'),
(5, 2, 1, 1, '2023-10-10 21:43:23', 'completado'),
(6, 2, 2, 3, '2023-09-10 21:43:23', 'completado'),
(7, 2, 3, 3, '2023-08-10 21:43:23', 'completado'),
(8, 2, 4, 1, '2023-07-10 21:43:23', 'completado'),
(9, 2, 5, 1, '2023-06-10 21:43:23', 'completado'),
(10, 2, 6, 2, '2023-05-10 21:43:23', 'completado'),
(11, 2, 7, 3, '2023-04-10 21:43:23', 'completado'),
(12, 2, 8, 5, '2023-03-10 21:43:23', 'completado'),
(13, 2, 9, 1, '2023-02-10 21:43:23', 'completado'),
(14, 2, 10, 1, '2023-01-10 21:43:23', 'completado'),
(15, 2, 11, 4, '2022-01-10 21:43:23', 'completado'),
(16, 2, 12, 3, '2022-07-10 21:43:23', 'completado'),
(17, 2, 13, 1, '2021-05-10 21:43:23', 'completado'),
(18, 2, 14, 1, '2023-09-10 21:43:23', 'completado'),
(19, 2, 15, 1, '2022-06-10 21:43:23', 'completado'),
(20, 2, 16, 5, '2021-06-10 21:43:23', 'completado'),
(21, 2, 17, 3, '2020-07-10 21:43:23', 'completado'),
(22, 2, 18, 1, '2020-07-10 21:43:23', 'completado'),
(23, 2, 19, 1, '2022-05-10 21:43:23', 'completado'),
(24, 2, 20, 6, '2020-05-10 21:43:23', 'completado'),
(25, 2, 21, 2, '2023-06-10 21:43:23', 'completado'),
(26, 2, 22, 1, '2023-03-10 21:43:23', 'completado'),
(27, 2, 23, 1, '2023-10-10 21:43:23', 'completado'),
(28, 2, 24, 2, '2022-12-10 21:43:23', 'completado'),
(29, 2, 3, 1, '2023-08-10 21:43:23', 'completado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activado` int(11) DEFAULT 1,
  `precio` float DEFAULT NULL,
  `estado` varchar(255) NOT NULL DEFAULT 'disponible',
  `id_tipo` int(3) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `titulo`, `imagen`, `descripcion`, `activado`, `precio`, `estado`, `id_tipo`, `createdAt`, `updatedAt`) VALUES
(1, 'rainbow six siege', 'b2eed1bd-5374-4ce8-abdc-32ed30348c5a.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 20, 'disponible', 1, '2023-11-23 00:00:00', '1900-01-23 00:00:00'),
(2, 'rainbow six siege\n', 'b2eed1bd-5374-4ce8-abdc-32ed30348c5a.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 5, 'disponible', 2, '2023-11-23 00:00:00', '0000-00-00 00:00:00'),
(3, 'rainbow six siege \n', 'b2eed1bd-5374-4ce8-abdc-32ed30348c5a.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 10, 'disponible', 3, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(4, 'six siege', 'b2eed1bd-5374-4ce8-abdc-32ed30348c5a.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 15, 'disponible', 5, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(5, 'siege ', 'b2eed1bd-5374-4ce8-abdc-32ed30348c5a.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 15, 'disponible', 5, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(6, 'pulpito', 'ac30d208-66f2-4228-b9a1-ac3c5e8013e3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 20, 'disponible', 1, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(7, 'robot', '5b2c0411-8e2f-47d1-a6b1-267de8f2c313.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 10, 'pocas existencias', 4, '2023-11-23 00:00:00', '2023-12-10 09:53:57'),
(8, 'pulpito ', 'ac30d208-66f2-4228-b9a1-ac3c5e8013e3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 15, 'disponible', 3, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(9, 'pulpito ', 'ac30d208-66f2-4228-b9a1-ac3c5e8013e3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 15, 'disponible', 5, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(10, 'robot variedad', 'ac30d208-66f2-4228-b9a1-ac3c5e8013e3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 10, 'disponible', 2, '2023-11-23 00:00:00', '2023-12-10 17:04:56'),
(11, 'planta ', 'f9bcd6be-e006-4405-a0bb-f6eb6e7d8628.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 30, 'disponible', 1, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(12, 'planta verde ', 'f9bcd6be-e006-4405-a0bb-f6eb6e7d8628.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 10, 'disponible', 2, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(13, 'planta flor ', 'f9bcd6be-e006-4405-a0bb-f6eb6e7d8628.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 10, 'disponible', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'planta flor', 'f9bcd6be-e006-4405-a0bb-f6eb6e7d8628.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 20, 'disponible', 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'planta hoja ', 'f9bcd6be-e006-4405-a0bb-f6eb6e7d8628.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 25, 'disponible', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'planta bigote', '445701cf-2481-4184-90c2-984896d8fc92.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 10, 'disponible', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'planta bigote ', '42565a28-3b2e-4adf-8465-8c3cee18a6a5.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 15, 'disponible', 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'planta naranja ', '42565a28-3b2e-4adf-8465-8c3cee18a6a5.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 40, 'disponible', 1, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(19, 'conejo', '42565a28-3b2e-4adf-8465-8c3cee18a6a5.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 15, 'disponible', 4, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(20, 'conejo', '42565a28-3b2e-4adf-8465-8c3cee18a6a5.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 35, 'disponible', 1, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(21, 'conejo', '42565a28-3b2e-4adf-8465-8c3cee18a6a5.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 10, 'disponible', 2, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(22, 'ardilla', '42565a28-3b2e-4adf-8465-8c3cee18a6a5.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 15, 'disponible', 4, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(23, 'ardilla', '42565a28-3b2e-4adf-8465-8c3cee18a6a5.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 35, 'disponible', 1, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(24, 'ardilla', '42565a28-3b2e-4adf-8465-8c3cee18a6a5.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 10, 'disponible', 2, '2023-11-23 00:00:00', '2023-11-23 00:00:00'),
(43, 'cartas animales', '4045b128-b11e-46da-83bb-bdc4ce8c149c.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 90.99, 'disponible', 4, '2023-11-26 15:09:25', '2023-12-10 01:18:06'),
(44, 'animalitos', '0fc3102c-9a52-430e-98db-5314c686b155.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 45, 'disponible', 2, '2023-11-26 16:03:17', '2023-12-10 01:17:43'),
(46, 'libro pueba', '422802d0-5d3a-4018-9e3f-6a1b5004727f.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 10, 'disponible', 4, '2023-12-03 02:12:46', '2023-12-10 01:17:31'),
(51, 'cartas', 'b45bd468-7d6e-4583-90a7-629e5fb35557.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 5, 'disponible', 4, '2023-12-09 18:09:16', '2023-12-10 01:17:24'),
(52, 'prueba peg', '78d420eb-2c9f-44be-9b0f-79485587c522.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 6, 'disponible', 2, '2023-12-09 18:14:37', '2023-12-10 01:17:15'),
(53, 'probando', '88220e3f-64e6-4c2f-83a9-9b59658d662d.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 65, 'disponible', 5, '2023-12-09 18:15:49', '2023-12-10 01:17:06'),
(55, 'parque', 'cb517ce2-c7eb-4fcb-8bdd-223208e2a965.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 300, 'disponible', 4, '2023-12-10 17:16:35', '2023-12-10 17:16:35'),
(56, 'modificando producto', '3fe71d8b-f44a-4b3c-80e0-848940da96ca.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation', 1, 15, 'pocas existencias', 4, '2023-12-10 19:49:33', '2023-12-10 19:50:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'cliente'),
(2, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolesasignados`
--

CREATE TABLE `rolesasignados` (
  `id_user` bigint(20) NOT NULL,
  `id_rol` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rolesasignados`
--

INSERT INTO `rolesasignados` (`id_user`, `id_rol`) VALUES
(2, 1),
(7, 2),
(8, 2),
(1, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 2),
(19, 2),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20231022142040-create-user.js'),
('20231022143249-create-roles.js'),
('20231022143418-create-roles-asignados.js'),
('20231029181039-create-disenos.js'),
('20231029181622-create-disenos-artistas.js'),
('20231029182211-create-producto.js'),
('20231029182445-create-favorito.js'),
('20231029182909-create-diseno-producto.js'),
('20231029183111-create-tipo.js'),
('20231029183144-create-tipo-producto.js'),
('20231108145016-create-pedido.js'),
('20231210101020-create-carrito.js'),
('20231210101309-create-carrito-producto.js'),
('20231210102216-create-detalles-pedido.js'),
('20231210105221-create-comentario.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `id` int(11) NOT NULL,
  `tipo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipos`
--

INSERT INTO `tipos` (`id`, `tipo`) VALUES
(1, 'camiseta'),
(2, 'pegatina'),
(3, 'taza'),
(4, 'poster'),
(5, 'bolsa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `conectado` int(11) DEFAULT 0,
  `habilitado` int(11) DEFAULT 1,
  `verifiedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `password`, `avatar`, `codigo`, `conectado`, `habilitado`, `verifiedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'prueba', 'prueba@example.com', '1234', 'f1ea62ac-0374-4608-a1d4-27103f0f854a.jpg', NULL, 0, 1, '2023-10-30 20:57:35', '2023-10-22 16:25:01', '2023-10-31 19:00:34'),
(2, 'prueba2', 'prueba2@example.com', '1234', 'b9e4c77c-3505-46eb-be95-e800d3819e0e.jpg', NULL, 1, 1, '2023-11-01 20:33:50', '2023-10-22 17:04:24', '2023-12-11 17:32:04'),
(7, 'artista2', 'xlmirulx@gmail.com', '1234', '3fa45e40-ed2a-4b22-8b63-034d2fb77891.jpg', 'bNG8Tut', 0, 1, '2023-10-22 18:31:33', '2023-10-22 18:31:16', '2023-10-31 18:59:52'),
(8, 'artista1', 'xlmiru9lx@gmail.com', '1234', '3593bf43-7fa5-4fbe-a8fd-aad6547b1188.jpg', NULL, 0, 1, '2023-10-30 19:56:17', '2023-10-30 18:55:59', '2023-11-01 19:34:23'),
(9, 'cliente3', 'cliente3@example.com', '1234', 'c5ab2f06-672b-4606-919f-6c26d78ffcfa.png', NULL, 0, 1, '2020-11-04 21:32:35', '2023-11-08 15:58:24', '2023-12-10 18:34:45'),
(10, 'cliente4', 'cliente4@example.com', '1234', '0ac258d5-e4a9-4426-86e4-1b6b2a361ebe.png', NULL, 0, 1, '2020-11-04 00:00:00', '2023-11-08 15:58:50', '2023-11-08 15:58:50'),
(11, 'cliente5', 'cliente5@example.com', '1234', '6d2792b9-61f2-4e7b-a6f9-fefc981dd909.jpg', NULL, 0, 1, '1900-01-01 00:00:00', '2023-11-08 16:00:11', '2023-11-08 16:00:11'),
(12, 'cliente6', 'cliente6@example.com', '1234', '018b5841-a307-4205-b956-4652990634f1.jpg', NULL, 0, 1, '2022-12-12 21:33:55', '2023-11-08 16:00:57', '2023-11-08 16:00:57'),
(13, 'cliente7', 'cliente7@example.com', '1234', '75e04915-bee5-4e2a-8163-fcca954c726f.jpg', NULL, 0, 1, '2022-12-10 00:00:00', '2023-11-08 16:01:32', '2023-11-08 16:01:32'),
(14, 'cliente8', 'cliente8@example.com', '1234', 'c60a4c61-d1c3-4d62-ad04-a14b97cfc4a3.jpg', NULL, 0, 1, '2020-12-09 21:33:09', '2023-11-08 16:02:01', '2023-11-08 16:02:01'),
(15, 'cliente9', 'cliente9@example.com', '1234', '94faf177-b29a-49bf-b531-c557f801c8c2.png', NULL, 0, 1, '2021-01-03 00:00:00', '2023-11-08 16:02:50', '2023-11-08 16:02:50'),
(16, 'cliente10', 'cliente10@example.com', '1234', '15c37c73-486c-489d-93d2-7e0f028d8f11.png', NULL, 0, 1, '2021-01-27 00:00:00', '2023-11-08 16:03:20', '2023-11-08 16:03:20'),
(17, 'cliente', 'cliente@example.com', '1234', 'c405b5e8-efe3-41a8-b8d1-1a39e2ebaeae.png', NULL, 0, 1, '2023-11-02 18:55:01', '2023-11-08 16:03:57', '2023-11-08 16:03:57'),
(18, 'artista3', 'artista3@example.com', '1234', 'e4b84144-0e58-4e27-ad1d-81e06b2e619e.png', NULL, 1, 1, '2019-01-17 18:55:13', '2023-11-08 16:04:35', '2023-12-11 17:57:19'),
(19, 'artista4', 'artista4@example.com', '1234', '85ef2f8c-adfc-4e1d-a47d-e4ad110cf8cf.png', NULL, 0, 1, '2023-11-08 00:00:00', '2023-11-08 16:05:05', '2023-11-08 16:05:05'),
(20, 'cliente11', 'cliente11@example.com', '1234', '0192349e-e090-4df0-88c0-2a8f75bd38b5.jpg', NULL, 0, 1, '2023-12-10 18:27:38', '2023-12-10 16:13:13', '2023-12-10 18:27:38'),
(21, 'cliente12', 'cliente12@example.com', '1234', '74689662-b4bf-4ee7-9b91-c0118cdb9485.png', NULL, 0, 1, NULL, '2023-12-10 16:17:50', '2023-12-10 16:17:50'),
(22, 'cliente13', 'cliente13@example.com', '1234', 'ea348395-7dc4-43b6-a0a1-e896eaa4f1e7.png', 'ZORfYRK', 0, 1, '2023-12-10 18:27:35', '2023-12-10 16:20:41', '2023-12-10 18:27:35'),
(23, 'cliente14', 'cliente14@example.com', '1234', 'a2e8ecab-e118-4f0f-8cdb-8425bb5286f1.png', 'myuLhE3', 0, 1, '2023-12-20 11:31:04', '2023-12-10 18:25:50', '2023-12-10 19:41:40'),
(24, 'cliente15', 'lmiru95l@gmail.com', '1234', '42c450d0-9213-41e0-b08c-6164698cc9ba.png', 't3bdsbH', 0, 1, '2023-12-11 17:46:12', '2023-12-11 17:45:49', '2023-12-11 17:50:18');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `disenos`
--
ALTER TABLE `disenos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `disenos`
--
ALTER TABLE `disenos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipos`
--
ALTER TABLE `tipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
