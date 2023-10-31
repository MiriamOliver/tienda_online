-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2023 a las 18:55:36
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
(3, 5);

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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `disenos`
--

INSERT INTO `disenos` (`id`, `titulo`, `imagen`, `tema`, `estilo`, `createdAt`, `updatedAt`) VALUES
(1, 'rainbow six siege', 'bbc3aaad-88f5-4c85-8025-21dc441c635c.jpg', 'videojuegos', 'digital', '2023-10-29 19:51:08', '2023-10-29 19:51:08'),
(2, 'six siege', '3593bf43-7fa5-4fbe-a8fd-aad6547b1188.jpg', 'videojuegos', 'mixto', '2023-10-30 20:51:36', '2023-10-30 20:51:36'),
(3, 'siege', 'b9e4c77c-3505-46eb-be95-e800d3819e0e.jpg', 'videojuegos', 'mixto', '2023-10-30 21:40:13', '2023-10-30 21:40:13');

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
(7, 3);

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
(2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activado` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `titulo`, `descripcion`, `activado`, `precio`) VALUES
(1, 'rainbow six siege - camiseta', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 1, 20),
(2, 'rainbow six siege - pegatinas\r\n', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\r\n', 1, 5),
(3, 'rainbow six siege - taza\n', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\r\n', 1, 10),
(4, 'six siege - bolsa', 'lorem ipsum dolor sit amet', 1, 15),
(5, 'siege - bolsa', 'lorem ipsum', 1, 15);

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
(1, 1);

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
('20231029183144-create-tipo-producto.js');

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
-- Estructura de tabla para la tabla `tiposproductos`
--

CREATE TABLE `tiposproductos` (
  `id_producto` bigint(20) NOT NULL,
  `id_tipo` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tiposproductos`
--

INSERT INTO `tiposproductos` (`id_producto`, `id_tipo`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 5),
(5, 5);

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
(1, 'prueba', 'prueba@example.com', '1234', 'f1ea62ac-0374-4608-a1d4-27103f0f854a.jpg', NULL, NULL, 1, '2023-10-30 20:57:35', '2023-10-22 16:25:01', '2023-10-22 16:25:01'),
(2, 'prueba2', 'prueba2@example.com', '1234', 'b9e4c77c-3505-46eb-be95-e800d3819e0e.jpg', NULL, NULL, 1, NULL, '2023-10-22 17:04:24', '2023-10-22 17:04:24'),
(7, 'artista2', 'xlmirulx@gmail.com', '1234', '3fa45e40-ed2a-4b22-8b63-034d2fb77891.jpg', 'bNG8Tut', 0, 1, '2023-10-22 18:31:33', '2023-10-22 18:31:16', '2023-10-30 19:19:06'),
(8, 'artista1', 'xlmiru95lx@gmail.com', '1234', '3593bf43-7fa5-4fbe-a8fd-aad6547b1188.jpg', NULL, 1, 1, '2023-10-30 19:56:17', '2023-10-30 18:55:59', '2023-10-30 19:24:38');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `disenos`
--
ALTER TABLE `disenos`
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
-- AUTO_INCREMENT de la tabla `disenos`
--
ALTER TABLE `disenos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
