const { StatusCodes } = require('http-status-codes');
const reviewSchema = require('./review.schema');
const service = require('./service');
const prisma = require('../../prisma/prismaClient');

const create = async (req, res) => {
  const result = reviewSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: result.error.format() });
  }

  try {
    const review = await service.createReview(result.data);
    res.status(StatusCodes.CREATED).json(review);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

const getAll = async (_, res) => {
  const reviews = await service.getAllReviews();
  res.status(StatusCodes.OK).json(reviews);
};

const getById = async (req, res) => {
  try {
    const { idUsuario, idFilme } = req.params;
    const review = await service.getReviewById(idUsuario, idFilme);
    res.status(StatusCodes.OK).json(review);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
  }
};

const update = async (req, res) => {
  const { idUsuario, idFilme } = req.params;
  const { nota, comentario } = req.body;

  if (req.usuario.tipoUsuario !== 'admin' && req.usuario.id !== Number(idUsuario)) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Você só pode atualizar suas próprias avaliações.' });
  }

  try {
    const updatedReview = await prisma.avaliacao.updateMany({
      where: {
        idUsuario: Number(idUsuario),
        idFilme: Number(idFilme),
      },
      data: { nota, comentario },
    });

    if (updatedReview.count === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Avaliação não encontrada' });
    }

    res.status(StatusCodes.OK).json({ message: 'Avaliação atualizada com sucesso' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { idUsuario, idFilme } = req.params;

  if (req.usuario.tipoUsuario !== 'admin' && req.usuario.id !== Number(idUsuario)) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Você só pode deletar suas próprias avaliações.' });
  }

  try {
    await service.deleteReview(idUsuario, idFilme);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
  }
};

module.exports = { create, getAll, getById, update, remove };
