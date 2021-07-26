-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cave" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "bearId" INTEGER,
    FOREIGN KEY ("bearId") REFERENCES "Bear" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cave" ("bearId", "createdAt", "id", "name", "updatedAt") SELECT "bearId", "createdAt", "id", "name", "updatedAt" FROM "Cave";
DROP TABLE "Cave";
ALTER TABLE "new_Cave" RENAME TO "Cave";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
