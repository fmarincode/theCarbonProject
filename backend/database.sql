-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema carbon_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema carbon_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `carbon_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `carbon_db` ;

-- -----------------------------------------------------
-- Table `carbon_db`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carbon_db`.`account` (
  `idaccount` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `pwd` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idaccount`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `carbon_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carbon_db`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `account_idaccount` INT NOT NULL,
  PRIMARY KEY (`iduser`, `account_idaccount`),
  INDEX `fk_user_account_idx` (`account_idaccount` ASC) VISIBLE,
  CONSTRAINT `fk_user_account`
    FOREIGN KEY (`account_idaccount`)
    REFERENCES `carbon_db`.`account` (`idaccount`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
