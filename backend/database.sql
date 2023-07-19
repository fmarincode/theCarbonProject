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


-- -----------------------------------------------------
-- Table `carbon_db`.`flight`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carbon_db`.`flight` (
  `idflight` INT NOT NULL AUTO_INCREMENT,
  `departure` VARCHAR(100) NOT NULL,
  `arrival` VARCHAR(100) NOT NULL,
  `passengers` INT NOT NULL,
  `totalKgEmission` INT NOT NULL,
  `kmDistance` INT NOT NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idflight`, `user_iduser`),
  INDEX `fk_flight_user_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_flight_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `carbon_db`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

