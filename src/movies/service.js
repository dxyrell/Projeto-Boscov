const prisma = require('../../prisma/prismaClient');

const createMovie = async (data) => {
  const { generos, ...movieData } = data;

  const filmeCriado = await prisma.filme.create({ data: movieData });

  // Cria as relações na tabela GeneroFilme
  const relacoes = generos.map((idGenero) => ({
    idGenero,
    idFilme: filmeCriado.id,
  }));

  await prisma.generoFilme.createMany({ data: relacoes });

  return filmeCriado;
};

const getAllMovies = () => prisma.filme.findMany();

const getMovieById = async (id) => {
  const movie = await prisma.filme.findUnique({ where: { id: Number(id) } });
  if (!movie) throw new Error("Filme não encontrado");
  return movie;
};

const updateMovie = async (id, data) => {
  const { generos, ...movieData } = data;

  // Atualiza os dados do filme
  const filmeAtualizado = await prisma.filme.update({
    where: { id: Number(id) },
    data: movieData,
  });

  if (generos && Array.isArray(generos)) {
    // Remove relações antigas
    await prisma.generoFilme.deleteMany({
      where: { idFilme: filmeAtualizado.id },
    });

    // Cria novas relações
    const novasRelacoes = generos.map((idGenero) => ({
      idGenero,
      idFilme: filmeAtualizado.id,
    }));

    await prisma.generoFilme.createMany({
      data: novasRelacoes,
    });
  }

  return filmeAtualizado;
};

const deleteMovie = async (id) => {
  const movieId = Number(id);

  // Remove vínculos em GeneroFilme
  await prisma.generoFilme.deleteMany({
    where: { idFilme: movieId },
  });

  // Agora pode deletar o filme
  return prisma.filme.delete({
    where: { id: movieId },
  });
};


module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
