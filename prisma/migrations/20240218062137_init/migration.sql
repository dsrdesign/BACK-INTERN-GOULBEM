-- CreateTable
CREATE TABLE `Responsable` (
    `idResponsable` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `poste` VARCHAR(191) NOT NULL,
    `nomUtilisateur` VARCHAR(191) NOT NULL,
    `motDePasse` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `codeDepartement` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Responsable_nomUtilisateur_key`(`nomUtilisateur`),
    PRIMARY KEY (`idResponsable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departement` (
    `codeDepartement` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`codeDepartement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stagiaire` (
    `idStagiaire` INTEGER NOT NULL AUTO_INCREMENT,
    `matriculeStagiaire` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `linkedin` VARCHAR(191) NOT NULL,
    `statut` VARCHAR(191) NOT NULL DEFAULT 'ACTIF',
    `debutStage` DATETIME(3) NOT NULL,
    `finStage` DATETIME(3) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `idResponsable` INTEGER NOT NULL,
    `codeDepartement` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Stagiaire_matriculeStagiaire_key`(`matriculeStagiaire`),
    PRIMARY KEY (`idStagiaire`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projet` (
    `idProjet` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `dureeProjet` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `idResponsable` INTEGER NOT NULL,

    PRIMARY KEY (`idProjet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tache` (
    `idTache` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `dureeTache` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `idStagiaire` INTEGER NOT NULL,
    `idProjet` INTEGER NOT NULL,

    PRIMARY KEY (`idTache`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Responsable` ADD CONSTRAINT `Responsable_codeDepartement_fkey` FOREIGN KEY (`codeDepartement`) REFERENCES `Departement`(`codeDepartement`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stagiaire` ADD CONSTRAINT `Stagiaire_idResponsable_fkey` FOREIGN KEY (`idResponsable`) REFERENCES `Responsable`(`idResponsable`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stagiaire` ADD CONSTRAINT `Stagiaire_codeDepartement_fkey` FOREIGN KEY (`codeDepartement`) REFERENCES `Departement`(`codeDepartement`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projet` ADD CONSTRAINT `Projet_idResponsable_fkey` FOREIGN KEY (`idResponsable`) REFERENCES `Responsable`(`idResponsable`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_idStagiaire_fkey` FOREIGN KEY (`idStagiaire`) REFERENCES `Stagiaire`(`idStagiaire`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_idProjet_fkey` FOREIGN KEY (`idProjet`) REFERENCES `Projet`(`idProjet`) ON DELETE NO ACTION ON UPDATE CASCADE;
