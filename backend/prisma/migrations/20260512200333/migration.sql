/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserPresence` table. All the data in the column will be lost.
  - You are about to drop the column `isPresent` on the `UserPresence` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserPresence` table. All the data in the column will be lost.
  - Added the required column `status` to the `LunchOrder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LunchOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lunchOptionId" TEXT NOT NULL,
    "lunchDayId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "LunchOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LunchOrder_lunchOptionId_fkey" FOREIGN KEY ("lunchOptionId") REFERENCES "LunchOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LunchOrder_lunchDayId_fkey" FOREIGN KEY ("lunchDayId") REFERENCES "LunchDay" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LunchOrder" ("id", "lunchDayId", "lunchOptionId", "userId") SELECT "id", "lunchDayId", "lunchOptionId", "userId" FROM "LunchOrder";
DROP TABLE "LunchOrder";
ALTER TABLE "new_LunchOrder" RENAME TO "LunchOrder";
CREATE UNIQUE INDEX "LunchOrder_userId_lunchDayId_key" ON "LunchOrder"("userId", "lunchDayId");
CREATE TABLE "new_UserPresence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "UserPresence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserPresence" ("date", "id", "userId") SELECT "date", "id", "userId" FROM "UserPresence";
DROP TABLE "UserPresence";
ALTER TABLE "new_UserPresence" RENAME TO "UserPresence";
CREATE INDEX "UserPresence_date_idx" ON "UserPresence"("date");
CREATE UNIQUE INDEX "UserPresence_userId_date_key" ON "UserPresence"("userId", "date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
