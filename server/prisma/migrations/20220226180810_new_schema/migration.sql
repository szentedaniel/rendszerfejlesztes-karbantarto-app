/*
  Warnings:

  - You are about to drop the `Maintenance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaintenanceQualification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaintenanceUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `maintenanceId` on the `Instruction` table. All the data in the column will be lost.
  - You are about to drop the column `days` on the `Period` table. All the data in the column will be lost.
  - You are about to drop the column `lastMaintenance` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `normaInMinutes` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `periodId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `active` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Instruction` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `periodInDays` to the `Period` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Maintenance";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MaintenanceQualification";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MaintenanceUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ScheduledMaintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "normaInMinutes" INTEGER NOT NULL,
    "lastMaintenance" DATETIME,
    "periodId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL DEFAULT 1,
    "priorityId" INTEGER NOT NULL,
    CONSTRAINT "ScheduledMaintenance_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
    CONSTRAINT "ScheduledMaintenance_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ScheduledMaintenance_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SpecialMaintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "normaInMinutes" INTEGER NOT NULL,
    "malfunctionDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceId" INTEGER NOT NULL,
    "priorityId" INTEGER NOT NULL,
    CONSTRAINT "SpecialMaintenance_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
    CONSTRAINT "SpecialMaintenance_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScheduledMaintenanceQualification" (
    "qualificationId" INTEGER NOT NULL,
    "maintenanceId" INTEGER NOT NULL,

    PRIMARY KEY ("qualificationId", "maintenanceId"),
    CONSTRAINT "ScheduledMaintenanceQualification_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "ScheduledMaintenance" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ScheduledMaintenanceQualification_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SpecialMaintenanceQualification" (
    "qualificationId" INTEGER NOT NULL,
    "maintenanceId" INTEGER NOT NULL,

    PRIMARY KEY ("qualificationId", "maintenanceId"),
    CONSTRAINT "SpecialMaintenanceQualification_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "SpecialMaintenance" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SpecialMaintenanceQualification_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scheduledMaintenanceId" INTEGER,
    "specialMaintenanceId" INTEGER,
    "userId" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "acceptedAt" DATETIME,
    "declinedAt" DATETIME,
    "startedAt" DATETIME,
    "finishedAt" DATETIME,
    "statusId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Task_scheduledMaintenanceId_fkey" FOREIGN KEY ("scheduledMaintenanceId") REFERENCES "ScheduledMaintenance" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_specialMaintenanceId_fkey" FOREIGN KEY ("specialMaintenanceId") REFERENCES "SpecialMaintenance" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Priority" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "id", "name", "password", "roleId", "updatedAt", "username") SELECT "createdAt", "id", "name", "password", "roleId", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Instruction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "scheduledMaintenanceId" INTEGER,
    "specialMaintenanceId" INTEGER,
    CONSTRAINT "Instruction_scheduledMaintenanceId_fkey" FOREIGN KEY ("scheduledMaintenanceId") REFERENCES "ScheduledMaintenance" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Instruction_specialMaintenanceId_fkey" FOREIGN KEY ("specialMaintenanceId") REFERENCES "SpecialMaintenance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Instruction" ("body", "id", "title") SELECT "body", "id", "title" FROM "Instruction";
DROP TABLE "Instruction";
ALTER TABLE "new_Instruction" RENAME TO "Instruction";
CREATE TABLE "new_UserQualification" (
    "qualificationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("qualificationId", "userId"),
    CONSTRAINT "UserQualification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserQualification_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserQualification" ("qualificationId", "userId") SELECT "qualificationId", "userId" FROM "UserQualification";
DROP TABLE "UserQualification";
ALTER TABLE "new_UserQualification" RENAME TO "UserQualification";
CREATE TABLE "new_Period" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "periodInDays" INTEGER NOT NULL
);
INSERT INTO "new_Period" ("id", "name") SELECT "id", "name" FROM "Period";
DROP TABLE "Period";
ALTER TABLE "new_Period" RENAME TO "Period";
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "identifier" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Device_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Device_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("categoryId", "description", "id", "identifier", "locationId", "name") SELECT "categoryId", "description", "id", "identifier", "locationId", "name" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE UNIQUE INDEX "Device_identifier_key" ON "Device"("identifier");
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("id", "name", "parentId") SELECT "id", "name", "parentId" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
