/*
  Warnings:

  - You are about to drop the column `city_id` on the `Org` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Org" DROP CONSTRAINT "Org_city_id_fkey";

-- AlterTable
ALTER TABLE "public"."Org" DROP COLUMN "city_id",
ADD COLUMN     "city" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."City";
