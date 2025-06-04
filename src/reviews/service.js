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

const updateReview = async (idUsuario, idFilme, data) => {
  const result = await prisma.avaliacao.updateMany({
    where: {
      idUsuario: Number(idUsuario),
      idFilme: Number(idFilme),
    },
    data,
  });

  if (result.count === 0) throw new Error('Avaliação não encontrada');
  return { message: 'Avaliação atualizada com sucesso' };
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

module.exports = { createReview, getAllReviews, getReviewById, updateReview, deleteReview };
