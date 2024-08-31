-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "image" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
