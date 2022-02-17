/*
  Warnings:

  - Added the required column `userId` to the `Maintenance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Maintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "exceptive" BOOLEAN NOT NULL DEFAULT false,
    "last" DATETIME NOT NULL,
    "normaInMinutes" INTEGER NOT NULL DEFAULT 60,
    "periodInDays" DECIMAL NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Maintenance_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Maintenance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Maintenance" ("assignedAt", "deviceId", "exceptive", "id", "last", "name", "normaInMinutes", "periodInDays") SELECT "assignedAt", "deviceId", "exceptive", "id", "last", "name", "normaInMinutes", "periodInDays" FROM "Maintenance";
DROP TABLE "Maintenance";
ALTER TABLE "new_Maintenance" RENAME TO "Maintenance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
