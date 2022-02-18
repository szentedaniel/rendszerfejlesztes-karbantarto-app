/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `last` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `normaInMinutes` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `periodInDays` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Maintenance` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifier` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Maintenance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "buildingId" INTEGER NOT NULL,
    CONSTRAINT "Location_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Building" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "normaInMinutes" INTEGER NOT NULL,
    "lastMaintenance" DATETIME NOT NULL,
    "periodId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,
    CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Category_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Period" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "days" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "MaintenanceUser" (
    "maintenanceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "acceptedAt" DATETIME NOT NULL,
    "declinedAt" DATETIME NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "finishedAt" DATETIME NOT NULL,
    "statusId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "maintenanceId"),
    CONSTRAINT "MaintenanceUser_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "Maintenance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MaintenanceUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MaintenanceUser_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Device_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Device_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("id", "name") SELECT "id", "name" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE TABLE "new_Maintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "exceptive" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Maintenance_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Maintenance" ("exceptive", "id", "name") SELECT "exceptive", "id", "name" FROM "Maintenance";
DROP TABLE "Maintenance";
ALTER TABLE "new_Maintenance" RENAME TO "Maintenance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
