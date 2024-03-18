/*
  Warnings:

  - The `details` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `traits` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "details",
ADD COLUMN     "details" TEXT[],
DROP COLUMN "traits",
ADD COLUMN     "traits" TEXT[];
