/*
  Warnings:

  - You are about to drop the column `state_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `task_state_id_foreign`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `user_role_id_foreign`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `state_id`,
    ADD COLUMN `state` ENUM('imported', 'transcribing', 'trashed', 'submitted', 'accepted', 'finalised') NOT NULL DEFAULT 'imported';

-- AlterTable
ALTER TABLE `User` DROP COLUMN `role_id`,
    ADD COLUMN `role` ENUM('TRANSCRIBER', 'REVIEWER', 'FINAL_REVIEWER') NOT NULL DEFAULT 'TRANSCRIBER';

-- DropTable
DROP TABLE `Role`;

-- DropTable
DROP TABLE `State`;
