-- CreateEnum
CREATE TYPE "public"."PetSize" AS ENUM ('MINI', 'SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "public"."Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "age" INTEGER,
    "color" TEXT,
    "size" "public"."PetSize" NOT NULL,
    "species" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "adopted_at" TIMESTAMP(3),

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Org" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "cityId" TEXT,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Pet" ADD CONSTRAINT "Pet_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Org" ADD CONSTRAINT "Org_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
