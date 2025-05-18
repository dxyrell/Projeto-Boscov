const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const generos = [
    "Ação",
    "Aventura",
    "Animação",
    "Comédia",
    "Crime",
    "Documentário",
    "Drama",
    "Família",
    "Fantasia",
    "Ficção Científica",
    "Mistério",
    "Musical",
    "Romance",
    "Suspense",
    "Terror",
    "Guerra",
    "Western",
    "Biografia",
    "Histórico"
  ];

  for (const descricao of generos) {
    await prisma.genero.upsert({
      where: { descricao },
      update: {},
      create: { descricao },
    });
  }

  console.log('Gêneros inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao popular gêneros:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
