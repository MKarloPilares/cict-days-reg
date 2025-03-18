/*
  Warnings:

  - Added the required column `mobile` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pref_strand` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` ADD COLUMN `mobile` VARCHAR(191) NOT NULL,
    ADD COLUMN `pref_strand` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_stud_id_fkey` FOREIGN KEY (`stud_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
