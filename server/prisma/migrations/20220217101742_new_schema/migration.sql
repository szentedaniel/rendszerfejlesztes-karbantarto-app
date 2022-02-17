-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "exceptive" BOOLEAN NOT NULL DEFAULT false,
    "last" DATETIME NOT NULL,
    "normaInMinutes" INTEGER NOT NULL DEFAULT 60,
    "periodInDays" DECIMAL NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Maintenance_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Instruction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "body" TEXT NOT NULL,
    "maintenanceId" INTEGER NOT NULL,
    CONSTRAINT "Instruction_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "Maintenance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
