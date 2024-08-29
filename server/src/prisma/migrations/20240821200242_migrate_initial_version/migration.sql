/*
  Warnings:

  - You are about to drop the column `behance` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `dribble` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `layout` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `layout` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `layout` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `layout` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `eperiences` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `eperiences` DROP FOREIGN KEY `Eperiences_usersId_fkey`;

-- AlterTable
ALTER TABLE `contacts` DROP COLUMN `behance`,
    DROP COLUMN `dribble`,
    DROP COLUMN `instagram`,
    DROP COLUMN `layout`;

-- AlterTable
ALTER TABLE `projects` DROP COLUMN `layout`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `likes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `views` DOUBLE NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE `skills` DROP COLUMN `layout`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `layout`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `eperiences`;

-- CreateTable
CREATE TABLE `Bio` (
    `id` VARCHAR(191) NOT NULL,
    `heroImage` VARCHAR(191) NULL DEFAULT '',
    `bio` VARCHAR(191) NULL DEFAULT 'your summary...',
    `jobTitle` VARCHAR(191) NULL DEFAULT 'your currrent job title.... ',
    `bioName` VARCHAR(191) NULL DEFAULT 'your name ',
    `layoutStyle` VARCHAR(191) NULL DEFAULT '1',
    `usersId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Experiences` (
    `id` VARCHAR(191) NOT NULL,
    `cName` VARCHAR(191) NOT NULL,
    `cLogo` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `start` VARCHAR(191) NOT NULL,
    `end` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `usersId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImagesList` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `projectsId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Layouts` (
    `id` VARCHAR(191) NOT NULL,
    `expLayout` VARCHAR(191) NOT NULL DEFAULT '1',
    `skillsLayout` VARCHAR(191) NOT NULL DEFAULT '1',
    `projectsLayout` VARCHAR(191) NOT NULL DEFAULT '1',
    `usersId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Users_id_key` ON `Users`(`id`);

-- AddForeignKey
ALTER TABLE `Bio` ADD CONSTRAINT `Bio_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experiences` ADD CONSTRAINT `Experiences_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagesList` ADD CONSTRAINT `ImagesList_projectsId_fkey` FOREIGN KEY (`projectsId`) REFERENCES `Projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Layouts` ADD CONSTRAINT `Layouts_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
