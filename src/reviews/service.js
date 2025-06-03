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

const getReviewById = async (id) => {
  const review = await prisma.avaliacao.findUnique({
    where: { id: Number(id) },
    include: { usuario: true, filme: true },
  });
  if (!review) throw new Error('Avaliação não encontrada');
  return review;
};

const deleteReview = async (id) => {
  return prisma.avaliacao.delete({ where: { id: Number(id) } });
};

module.exports = { createReview, getAllReviews, getReviewById, deleteReview };
