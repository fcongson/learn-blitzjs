-- CreateTable
CREATE TABLE "Cave" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "bearId" INTEGER NOT NULL,
    FOREIGN KEY ("bearId") REFERENCES "Bear" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);