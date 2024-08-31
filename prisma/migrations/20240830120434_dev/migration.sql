-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "image" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'COFFEE',
    CONSTRAINT "Products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("category", "description", "id", "image", "name", "price", "stock", "user_id") SELECT "category", "description", "id", "image", "name", "price", "stock", "user_id" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_of_birth" DATETIME,
    "gender" TEXT,
    "image" TEXT,
    "address" TEXT,
    "role" TEXT DEFAULT 'USER',
    "refresh_token" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_Users" ("address", "created_at", "date_of_birth", "email", "first_name", "gender", "id", "image", "last_name", "password", "phone_number", "refresh_token", "role", "updated_at") SELECT "address", "created_at", "date_of_birth", "email", "first_name", "gender", "id", "image", "last_name", "password", "phone_number", "refresh_token", "role", "updated_at" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE UNIQUE INDEX "Users_refresh_token_key" ON "Users"("refresh_token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
