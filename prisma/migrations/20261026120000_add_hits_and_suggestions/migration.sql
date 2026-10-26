-- AlterTable
ALTER TABLE `statistics` ADD COLUMN `hits` INTEGER NULL;

-- CreateTable
CREATE TABLE `suggestions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(200) NOT NULL,
    `translation` VARCHAR(500) NOT NULL,
    `direction` VARCHAR(10) NOT NULL,
    `comment` TEXT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ny',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
