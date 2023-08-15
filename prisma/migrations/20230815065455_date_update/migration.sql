-- AlterTable
ALTER TABLE `Task` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `submitted_on` DATETIME(3) NULL,
    MODIFY `reviewed_on` DATETIME(3) NULL,
    MODIFY `finalised_reviewed_on` DATETIME(3) NULL;
