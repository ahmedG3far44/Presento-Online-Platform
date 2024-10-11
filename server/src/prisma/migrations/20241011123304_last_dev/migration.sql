/*
  Warnings:

  - You are about to drop the column `layoutStyle` on the `bio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bio` DROP COLUMN `layoutStyle`,
    MODIFY `bio` TEXT NULL,
    MODIFY `jobTitle` VARCHAR(191) NULL DEFAULT 'change your currrent job title.... ',
    MODIFY `bioName` VARCHAR(191) NULL DEFAULT 'change your name....';

-- AlterTable
ALTER TABLE `experiences` MODIFY `role` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `layouts` ADD COLUMN `heroLayout` VARCHAR(191) NULL DEFAULT '1';

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `source` VARCHAR(191) NULL,
    MODIFY `thumbnail` TEXT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `resume` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Testimonials` (
    `id` VARCHAR(191) NOT NULL,
    `profile` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `feedback` TEXT NULL,
    `video` VARCHAR(191) NULL,
    `position` VARCHAR(191) NOT NULL,
    `usersId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Testimonials` ADD CONSTRAINT `Testimonials_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
