/*
  Warnings:

  - You are about to drop the column `pref_strand` on the `students` table. All the data in the column will be lost.
  - Added the required column `prefCourse` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `pref_strand`,
    ADD COLUMN `prefCourse` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_stud_id_fkey` FOREIGN KEY (`stud_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
