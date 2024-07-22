-- CreateEnum
CREATE TYPE "FragranceCategory" AS ENUM ('HERBACEOUS', 'SMOKEY', 'FRUITY', 'FRESH', 'FLORAL', 'CITRUS');

-- CreateTable
CREATE TABLE "Fragrance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "FragranceCategory" NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Fragrance_pkey" PRIMARY KEY ("id")
);
