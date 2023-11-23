CREATE DATABASE cow_salud;
 
USE cow_salud;

CREATE TABLE `doctores`(
	`id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `especialidad` VARCHAR(30) NOT NULL,
    `consultorio` INT NOT NULL, 
    `correo_electronico` VARCHAR(100) NOT NULL,
    `activo` INT NOT NULL

);

CREATE TABLE `citas`(
	`id_doctor`INT, 
    `id_paciente` BIGINT,
    `fecha` DATETIME,
    FOREIGN KEY (`id_doctor`) REFERENCES `doctores`(`id`),
    FOREIGN KEY (`id_paciente`) REFERENCES `pacientes`(`numero_cedula`)
);

CREATE TABLE `pacientes`(
	`numero_cedula` BIGINT NOT NULL PRIMARY KEY,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `edad` INT NOT NULL,
    `telefono` BIGINT
    `activo` INT NOT NULL
);

