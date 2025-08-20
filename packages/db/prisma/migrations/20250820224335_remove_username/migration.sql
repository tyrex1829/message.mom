/*
  Warnings:

  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."user_username_key";

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "username";

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "public"."user"("name");
