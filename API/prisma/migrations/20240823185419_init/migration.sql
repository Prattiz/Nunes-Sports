-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" REAL NOT NULL
);
