/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `data_nascimento` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `dataAtualizacao` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoUsuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "createdAt",
DROP COLUMN "data_nascimento",
DROP COLUMN "updatedAt",
ADD COLUMN     "apelido" TEXT,
ADD COLUMN     "dataAtualizacao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD COLUMN     "tipoUsuario" TEXT NOT NULL,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "diretor" TEXT NOT NULL,
    "anoLancamento" INTEGER NOT NULL,
    "duracao" INTEGER NOT NULL,
    "produtora" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL,
    "poster" TEXT NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneroFilme" (
    "id" SERIAL NOT NULL,
    "idGenero" INTEGER NOT NULL,
    "idFilme" INTEGER NOT NULL,

    CONSTRAINT "GeneroFilme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "idUsuario" INTEGER NOT NULL,
    "idFilme" INTEGER NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("idUsuario","idFilme")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneroFilme_idGenero_idFilme_key" ON "GeneroFilme"("idGenero", "idFilme");

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_idGenero_fkey" FOREIGN KEY ("idGenero") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_idFilme_fkey" FOREIGN KEY ("idFilme") REFERENCES "Filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_idFilme_fkey" FOREIGN KEY ("idFilme") REFERENCES "Filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
