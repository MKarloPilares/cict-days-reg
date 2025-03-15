-- AlterTable
ALTER TABLE `students` MODIFY `birthday` DATE NOT NULL;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_reg_id_fkey` FOREIGN KEY (`reg_id`) REFERENCES `registrations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
