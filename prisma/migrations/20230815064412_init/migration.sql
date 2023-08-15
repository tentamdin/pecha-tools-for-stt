-- CreateTable
CREATE TABLE `Group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `State` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `state_id` INTEGER NOT NULL,
    `inference_transcript` VARCHAR(255) NULL,
    `transcript` VARCHAR(255) NULL,
    `reviewed_transcript` VARCHAR(255) NULL,
    `final_transcript` VARCHAR(255) NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `transcriber_id` INTEGER NULL,
    `reviewer_id` INTEGER NULL,
    `final_reviewer_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL,
    `submitted_on` DATETIME(0) NULL,
    `reviewed_on` DATETIME(0) NULL,
    `finalised_reviewed_on` DATETIME(0) NULL,

    INDEX `task_final_reviewer_id_foreign`(`final_reviewer_id`),
    INDEX `task_group_id_foreign`(`group_id`),
    INDEX `task_reviewer_id_foreign`(`reviewer_id`),
    INDEX `task_state_id_foreign`(`state_id`),
    INDEX `task_transcriber_id_foreign`(`transcriber_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `group_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `user_group_id_foreign`(`group_id`),
    INDEX `user_role_id_foreign`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `task_final_reviewer_id_foreign` FOREIGN KEY (`final_reviewer_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `task_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `task_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `task_state_id_foreign` FOREIGN KEY (`state_id`) REFERENCES `State`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `task_transcriber_id_foreign` FOREIGN KEY (`transcriber_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `user_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
