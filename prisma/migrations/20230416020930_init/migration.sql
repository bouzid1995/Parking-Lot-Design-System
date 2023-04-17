-- DropForeignKey
ALTER TABLE `slot` DROP FOREIGN KEY `slot_vehicle_type_id_fkey`;

-- AddForeignKey
ALTER TABLE `slot` ADD CONSTRAINT `slot_vehicle_type_id_fkey` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
