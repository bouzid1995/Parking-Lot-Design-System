/*
  Warnings:

  - You are about to drop the column `floor_id` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `total_position_nbr` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle_type_id` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `position_id` on the `ticked` table. All the data in the column will be lost.
  - You are about to drop the `position` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `available` to the `slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorID` to the `slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_id` to the `slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot_id` to the `ticked` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `position` DROP FOREIGN KEY `position_slot_id_fkey`;

-- DropForeignKey
ALTER TABLE `position` DROP FOREIGN KEY `position_vehicle_id_fkey`;

-- DropForeignKey
ALTER TABLE `slot` DROP FOREIGN KEY `slot_floor_id_fkey`;

-- DropForeignKey
ALTER TABLE `slot` DROP FOREIGN KEY `slot_vehicle_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticked` DROP FOREIGN KEY `ticked_position_id_fkey`;

-- AlterTable
ALTER TABLE `slot` DROP COLUMN `floor_id`,
    DROP COLUMN `total_position_nbr`,
    DROP COLUMN `vehicle_type_id`,
    ADD COLUMN `available` INTEGER NOT NULL,
    ADD COLUMN `floorID` INTEGER NOT NULL,
    ADD COLUMN `vehicle_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ticked` DROP COLUMN `position_id`,
    ADD COLUMN `slot_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `position`;

-- AddForeignKey
ALTER TABLE `ticked` ADD CONSTRAINT `ticked_slot_id_fkey` FOREIGN KEY (`slot_id`) REFERENCES `slot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slot` ADD CONSTRAINT `slot_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slot` ADD CONSTRAINT `slot_floorID_fkey` FOREIGN KEY (`floorID`) REFERENCES `floor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
