-- AlterTable
ALTER TABLE `registrations` ADD COLUMN `win` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_stud_id_fkey` FOREIGN KEY (`stud_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
