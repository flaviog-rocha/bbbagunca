/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Reality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_code]` on the table `Reality` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Reality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_code` to the `Reality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reality" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "name_code" TEXT NOT NULL,
ALTER COLUMN "sec_power" DROP NOT NULL,
ALTER COLUMN "danger_zone" DROP NOT NULL,
ALTER COLUMN "safe_zone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Season" (
    "id_season" SERIAL NOT NULL,
    "id_reality" INTEGER NOT NULL,
    "codename" TEXT,
    "season_number" INTEGER NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id_season")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reality_name_key" ON "Reality"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Reality_name_code_key" ON "Reality"("name_code");

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_id_reality_fkey" FOREIGN KEY ("id_reality") REFERENCES "Reality"("id_reality") ON DELETE RESTRICT ON UPDATE CASCADE;
