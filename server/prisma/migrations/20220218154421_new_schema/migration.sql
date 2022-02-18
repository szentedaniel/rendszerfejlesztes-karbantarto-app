-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MaintenanceUser" (
    "maintenanceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "acceptedAt" DATETIME,
    "declinedAt" DATETIME,
    "startedAt" DATETIME,
    "finishedAt" DATETIME,
    "statusId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "maintenanceId"),
    CONSTRAINT "MaintenanceUser_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "Maintenance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MaintenanceUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MaintenanceUser_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MaintenanceUser" ("acceptedAt", "assignedAt", "declinedAt", "finishedAt", "maintenanceId", "startedAt", "statusId", "updatedAt", "userId") SELECT "acceptedAt", "assignedAt", "declinedAt", "finishedAt", "maintenanceId", "startedAt", "statusId", "updatedAt", "userId" FROM "MaintenanceUser";
DROP TABLE "MaintenanceUser";
ALTER TABLE "new_MaintenanceUser" RENAME TO "MaintenanceUser";
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "normaInMinutes" INTEGER NOT NULL,
    "lastMaintenance" DATETIME,
    "periodId" INTEGER NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Category_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("id", "lastMaintenance", "name", "normaInMinutes", "parentId", "periodId") SELECT "id", "lastMaintenance", "name", "normaInMinutes", "parentId", "periodId" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
