/*
  Warnings:

  - You are about to drop the column `code` on the `slot` table. All the data in the column will be lost.
  - Added the required column `number` to the `slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `slot` DROP COLUMN `code`,
    ADD COLUMN `number` INTEGER NOT NULL;
