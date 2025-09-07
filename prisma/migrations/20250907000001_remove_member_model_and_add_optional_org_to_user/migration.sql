/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_org_id_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "org_id" TEXT;

-- DropTable
DROP TABLE "public"."Member";

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."Org"("id") ON DELETE SET NULL ON UPDATE CASCADE;
