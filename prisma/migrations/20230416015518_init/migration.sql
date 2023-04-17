/*
  Warnings:

  - You are about to drop the column `vehicle_id` on the `slot` table. All the data in the column will be lost.
  - Added the required column `vehicle_type_id` to the `slot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `slot` DROP FOREIGN KEY `slot_vehicle_id_fkey`;

-- AlterTable
ALTER TABLE `slot` DROP COLUMN `vehicle_id`,
    ADD COLUMN `vehicle_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `slot` ADD CONSTRAINT `slot_vehicle_type_id_fkey` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
