-- CreateTable
CREATE TABLE "Reality" (
    "id_reality" SERIAL NOT NULL,
    "max_power" TEXT NOT NULL,
    "sec_power" TEXT NOT NULL,
    "danger_zone" TEXT NOT NULL,
    "safe_zone" TEXT NOT NULL,

    CONSTRAINT "Reality_pkey" PRIMARY KEY ("id_reality")
);
