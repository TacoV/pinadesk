/*
  Warnings:

  - You are about to drop the `Presence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Presence";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserPresence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "isPresent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserPresence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LunchDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "reason" TEXT
);

-- CreateTable
CREATE TABLE "LunchOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "breadType" TEXT NOT NULL,
    "price" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "LunchOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lunchOptionId" TEXT NOT NULL,
    "lunchDayId" TEXT NOT NULL,
    CONSTRAINT "LunchOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LunchOrder_lunchOptionId_fkey" FOREIGN KEY ("lunchOptionId") REFERENCES "LunchOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LunchOrder_lunchDayId_fkey" FOREIGN KEY ("lunchDayId") REFERENCES "LunchDay" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "defaultLunchOptionId" TEXT,
    CONSTRAINT "User_defaultLunchOptionId_fkey" FOREIGN KEY ("defaultLunchOptionId") REFERENCES "LunchOption" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "name") SELECT "email", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "UserPresence_date_idx" ON "UserPresence"("date");

-- CreateIndex
CREATE UNIQUE INDEX "UserPresence_userId_date_key" ON "UserPresence"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "LunchDay_date_key" ON "LunchDay"("date");

-- CreateIndex
CREATE UNIQUE INDEX "LunchOrder_userId_lunchDayId_key" ON "LunchOrder"("userId", "lunchDayId");
