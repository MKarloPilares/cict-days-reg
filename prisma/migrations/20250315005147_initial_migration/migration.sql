-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reg_id` INTEGER NOT NULL,
    `studLevel` VARCHAR(191) NOT NULL,
    `stud_id` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `students_reg_id_key`(`reg_id`),
    UNIQUE INDEX `students_stud_id_key`(`stud_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_reg_id_fkey` FOREIGN KEY (`reg_id`) REFERENCES `registrations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
