-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2021 a las 18:26:17
-- Versión del servidor: 10.1.32-MariaDB
-- Versión de PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `data_warehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `id` int(10) NOT NULL,
  `country_id` int(10) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id`, `country_id`, `name`) VALUES
(1, 1, 'Rosario'),
(2, 3, 'Cali'),
(4, 4, 'Santiago'),
(5, 3, 'Medellin'),
(6, 5, 'Tolna'),
(7, 5, 'Budapest');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `id` int(10) NOT NULL,
  `name` varchar(64) NOT NULL,
  `cityId` int(10) NOT NULL,
  `address` varchar(64) DEFAULT NULL,
  `email` varchar(64) NOT NULL,
  `telephone` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `companies`
--

INSERT INTO `companies` (`id`, `name`, `cityId`, `address`, `email`, `telephone`) VALUES
(2, 'Globant', 1, '123', 'globant@globant', 1231241),
(8, 'Mercado Libre', 2, 'nada', 'meli@meli', 1233123);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) NOT NULL,
  `name` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `company_id` int(10) NOT NULL,
  `position` varchar(64) NOT NULL,
  `contact_channel` int(10) DEFAULT NULL,
  `interest` int(10) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `cityId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `lastname`, `email`, `company_id`, `position`, `contact_channel`, `interest`, `address`, `cityId`) VALUES
(23, 'Anna', 'Pipke', 'anna@asiko', 8, 'Dev', NULL, 50, '33 orientales', 1),
(24, 'Daniela', 'Pipke', 'dfpipke22@ucema.edu.ar', 2, 'Dev', NULL, 50, '33 orientales', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact_channels`
--

CREATE TABLE `contact_channels` (
  `id` int(10) NOT NULL,
  `contactId` int(10) NOT NULL,
  `contact_channel_id` int(10) NOT NULL,
  `user_account` varchar(64) NOT NULL,
  `preferences_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contact_channels`
--

INSERT INTO `contact_channels` (`id`, `contactId`, `contact_channel_id`, `user_account`, `preferences_id`) VALUES
(1, 1, 1, 'Daniela Pipke', 1),
(2, 1, 2, '@danipipke', 2),
(3, 15, 1, 'facebook', NULL),
(4, 15, 2, 'instagram', NULL),
(5, 16, 1, 'facebook', NULL),
(6, 16, 2, 'INSTAGRAM', NULL),
(7, 17, 1, 'facebook', NULL),
(8, 17, 2, 'INSTAGRAM', NULL),
(9, 18, 1, 'facebook', NULL),
(10, 19, 1, 'o', NULL),
(11, 19, 2, 'facebook', NULL),
(12, 22, 1, 'facebook', NULL),
(13, 22, 2, 'as', NULL),
(14, 23, 1, 'facebook', NULL),
(15, 23, 2, 'as', NULL),
(16, 24, 1, 'facebook', NULL),
(17, 24, 2, '@instagram', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact_social_media`
--

CREATE TABLE `contact_social_media` (
  `id` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contact_social_media`
--

INSERT INTO `contact_social_media` (`id`, `name`) VALUES
(1, 'Facebook'),
(2, 'Instagram\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` int(10) NOT NULL,
  `region_id` int(10) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `region_id`, `name`) VALUES
(1, 1, 'argentina'),
(3, 1, 'Colombia'),
(4, 1, 'Chile'),
(5, 3, 'Hungría');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferences`
--

CREATE TABLE `preferences` (
  `id` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `preferences`
--

INSERT INTO `preferences` (`id`, `name`) VALUES
(1, 'Favorito'),
(2, 'NO molestar\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regions`
--

CREATE TABLE `regions` (
  `id` int(10) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `regions`
--

INSERT INTO `regions` (`id`, `name`) VALUES
(1, 'latam'),
(2, 'Africa'),
(3, 'Europa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `admin`, `password`) VALUES
(4, 'Admin', '', 'root', 1, '$2b$10$9j4bY6zqMKcJ9DQnIZzMpusQFXVw1p18m6P.MO37BQBQ51U9UnwQS'),
(8, 'Daniela', 'Pipke', 'dfpipke22@ucema.edu.ar', 0, '$2b$10$u4yauL/PqtXqFdjPJB1RneA4vThalFSlYD5RkAat0ZHC7SO3jExvC');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contact_channels`
--
ALTER TABLE `contact_channels`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contact_social_media`
--
ALTER TABLE `contact_social_media`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `region_id` (`region_id`);

--
-- Indices de la tabla `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `regions`
--
ALTER TABLE `regions`
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
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `contact_channels`
--
ALTER TABLE `contact_channels`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `contact_social_media`
--
ALTER TABLE `contact_social_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `preferences`
--
ALTER TABLE `preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

--
-- Filtros para la tabla `countries`
--
ALTER TABLE `countries`
  ADD CONSTRAINT `countries_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
