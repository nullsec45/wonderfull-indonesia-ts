-- CreateTable
CREATE TABLE "tradisional_clothings" (
    "id" SERIAL NOT NULL,
    "province_id" INTEGER NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "tradisional_clothings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tradisional_clothings" ADD CONSTRAINT "tradisional_clothings_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
