-- CreateTable
CREATE TABLE "traditional_foods" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "province_id" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "traditional_foods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "traditional_foods" ADD CONSTRAINT "traditional_foods_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
