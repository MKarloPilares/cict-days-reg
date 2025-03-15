/*
  Warnings:

  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reg_id` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `stud_id` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stud_id]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stud_id` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `students_reg_id_key` ON `students`;

-- DropIndex
DROP INDEX `students_stud_id_key` ON `students`;

-- AlterTable
ALTER TABLE `registrations` ADD COLUMN `stud_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `students` DROP PRIMARY KEY,
    DROP COLUMN `reg_id`,
    DROP COLUMN `stud_id`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `registrations_stud_id_key` ON `registrations`(`stud_id`);

-- CreateIndex
CREATE UNIQUE INDEX `students_id_key` ON `students`(`id`);

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_stud_id_fkey` FOREIGN KEY (`stud_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
