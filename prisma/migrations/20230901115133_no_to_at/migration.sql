/*
  Warnings:

  - You are about to drop the column `finalised_reviewed_on` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `reviewed_on` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `submitted_on` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `finalised_reviewed_on`,
    DROP COLUMN `reviewed_on`,
    DROP COLUMN `submitted_on`,
    ADD COLUMN `finalised_reviewed_at` DATETIME(3) NULL,
    ADD COLUMN `reviewed_at` DATETIME(3) NULL,
    ADD COLUMN `submitted_at` DATETIME(3) NULL;
