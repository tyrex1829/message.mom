/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "socialsJson" JSONB,
    "lastSeenVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."message" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyBody" TEXT,
    "repliedAt" TIMESTAMPTZ,
    "viewTokenHash" VARCHAR(128) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "public"."profile"("userId");

-- CreateIndex
CREATE INDEX "message_ownerId_createdAt_idx" ON "public"."message"("ownerId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "public"."user"("username");

-- AddForeignKey
ALTER TABLE "public"."profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."message" ADD CONSTRAINT "message_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
