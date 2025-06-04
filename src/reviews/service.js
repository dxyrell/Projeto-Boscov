const prisma = require('../../prisma/prismaClient');

const createReview = async (data) => {
  return prisma.avaliacao.create({ data });
};

const getAllReviews = () => {
  return prisma.avaliacao.findMany({
    include: {
      usuario: { select: { nome: true, apelido: true } },
      filme: { select: { nome: true } },
    },
  });
};

const getReviewById = async (idUsuario, idFilme) => {
  const review = await prisma.avaliacao.findUnique({
    where: {
      idUsuario_idFilme: {
        idUsuario: Number(idUsuario),
        idFilme: Number(idFilme),
      }
    },
    include: { usuario: true, filme: true },
  });
  if (!review) throw new Error('Avaliação não encontrada');
  return review;
};


const deleteReview = async (idUsuario, idFilme) => {
  return prisma.avaliacao.delete({
    where: {
      idUsuario_idFilme: {
        idUsuario: Number(idUsuario),
        idFilme: Number(idFilme),
      }
    }

  })};

module.exports = { createReview, getAllReviews, getReviewById, deleteReview };
