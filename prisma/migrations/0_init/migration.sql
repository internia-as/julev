-- CreateTable
CREATE TABLE `smj_translations` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `fra` TEXT NULL,
    `til` TEXT NULL,
    `oversatt_fra` TEXT NULL,
    `oversatt_til` TEXT NULL,
    `kredittering` TEXT NULL,
    `publisert` INTEGER NULL,
    `kildeId` INTEGER NULL,
    `brukerforslag` INTEGER NULL,
    `brukerepost` TEXT NULL,
    `behandlingId` INTEGER NULL,
    `sikor_hits` INTEGER NULL,

    UNIQUE INDEX `smj_translations_id_idx`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statistics` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` TEXT NOT NULL,
    `query` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `smj_translations_id_idx`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;