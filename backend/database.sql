-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema carbon_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema carbon_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `carbon_db` DEFAULT CHARACTER SET utf8 ;
USE `carbon_db` ;

-- -----------------------------------------------------
-- Table `carbon_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carbon_db`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;

INSERT INTO user (iduser, firstname, email, hashedPassword) VALUES 
(1, "Florent", 'florent@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$mjhH9dxoW9Y+TZ+H39sfXA$f/9myuRnhS+d6igPbIJ6nPGLoWl6yE1SoJlldZujZk0'),
(2, "Arthur", 'arthur@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$mjhH9dxoW9Y+TZ+H39sfXA$f/9myuRnhS+d6igPbIJ6nPGLoWl6yE1SoJlldZujZk0'),
(3, "Lisa", 'lisa@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$mjhH9dxoW9Y+TZ+H39sfXA$f/9myuRnhS+d6igPbIJ6nPGLoWl6yE1SoJlldZujZk0'),
(4, "Marion", 'marion@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$mjhH9dxoW9Y+TZ+H39sfXA$f/9myuRnhS+d6igPbIJ6nPGLoWl6yE1SoJlldZujZk0'),
(5, "Arnaud", 'arnaud@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$mjhH9dxoW9Y+TZ+H39sfXA$f/9myuRnhS+d6igPbIJ6nPGLoWl6yE1SoJlldZujZk0');

-- -----------------------------------------------------
-- Table `carbon_db`.`planeJourney`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carbon_db`.`planeJourney` (
  `idPlaneJourney` INT NOT NULL AUTO_INCREMENT,
  `departure` VARCHAR(100) NOT NULL,
  `arrival` VARCHAR(100) NOT NULL,
  `passengers` INT NOT NULL,
  `totalKgEmission` INT NOT NULL,
  `kmDistance` INT NOT NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idPlaneJourney`, `user_iduser`),
  INDEX `fk_planeJourney_user_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_planeJourney_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `carbon_db`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO planeJourney (idPlaneJourney, departure, arrival, passengers, totalKgEmission, kmDistance, user_iduser) VALUES 
(1, "paris", "marseille", 1, 123, 775, 1),
(2, "paris", "madrid", 1, 171, 1155, 2),
(3, "paris", "venice", 2, 343, 973, 3),
(4, "marseille", "venice", 2, 108, 710, 4),
(5, "paris", "casablanca", 2, 594, 2022, 5),
(6, "paris", "zagreb", 2, 470, 1217, 1),
(7, "paris", "venice", 2, 343, 973, 1),
(8, "paris", "casablanca", 2, 594, 2022, 1),
(9, "casablanca", "paris", 2, 594, 2022, 1),
(10, "venice", "paris", 2, 343, 973, 1);


-- -----------------------------------------------------
-- Table `carbon_db`.`carJourney`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carbon_db`.`carJourney` (
  `idCarJourney` INT NOT NULL AUTO_INCREMENT,
  `departure` VARCHAR(100) NOT NULL,
  `arrival` VARCHAR(100) NOT NULL,
  `carBrand` VARCHAR(100) NOT NULL,
  `carModel` VARCHAR(100) NOT NULL,
  `totalKgEmission` INT NOT NULL,
  `kmDistance` INT NOT NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idCarJourney`, `user_iduser`),
  INDEX `fk_carJourney_user_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_carJourney_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `carbon_db`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO carJourney (idCarJourney, departure, arrival, carBrand, carModel, totalKgEmission, kmDistance, user_iduser) VALUES 
(1, "paris", "madrid","Alfa Romeo", "164 (1995)", 231, 1270, 1),
(2, "paris", "lille","Alfa Romeo", "164 (1995)", 54, 225, 1),
(3, "paris", "lille","Alfa Romeo", "164 (1995)", 54, 225, 2),
(4, "paris", "madrid","Alfa Romeo", "164 (1995)", 231, 1270, 3),
(5, "paris", "madrid","Alfa Romeo", "164 (1995)", 231, 1270, 2),
(6, "madrid", "paris","Alfa Romeo", "164 (1995)", 231, 1270, 1),
(7, "madrid", "paris","Alfa Romeo", "164 (1995)", 231, 1270, 1),
(8, "madrid", "paris","Alfa Romeo", "164 (1995)", 231, 1270, 1),
(9, "madrid", "paris","Alfa Romeo", "164 (1995)", 231, 1270, 1),
(10, "madrid", "paris","Alfa Romeo", "164 (1995)", 231, 1270, 1);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

