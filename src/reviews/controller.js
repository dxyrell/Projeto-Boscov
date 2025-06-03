const { StatusCodes } = require('http-status-codes');
const reviewSchema = require('./review.schema');
const service = require('./service');

const create = async (req, res) => {
  const result = reviewSchema.safeParse(req.body);
  if (!result.success) return res.status(StatusCodes.BAD_REQUEST).json({ error: result.error.format() });

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
    const review = await service.getReviewById(req.params.id);
    res.status(StatusCodes.OK).json(review);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteReview(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
  }
};

module.exports = { create, getAll, getById, remove };
