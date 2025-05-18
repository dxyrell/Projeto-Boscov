const { StatusCodes } = require('http-status-codes');
const movieSchema = require('./movie.schema');
const service = require('./service');

const create = async (req, res) => {
  const result = movieSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: result.error.format() });
  }

  try {
    const movie = await service.createMovie(result.data);
    return res.status(StatusCodes.CREATED).json(movie);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
};

const getAll = async (_, res) => {
  try {
    const movies = await service.getAllMovies();
    return res.status(StatusCodes.OK).json(movies);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const movie = await service.getMovieById(req.params.id);
    return res.status(StatusCodes.OK).json(movie);
  } catch (e) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: e.message });
  }
};

const update = async (req, res) => {
  const result = movieSchema.partial().safeParse(req.body);
  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: result.error.format() });
  }

  try {
    const movie = await service.updateMovie(req.params.id, result.data);
    return res.status(StatusCodes.OK).json(movie);
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: e.message });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteMovie(req.params.id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: e.message });
  }
};

module.exports = { create, getAll, getById, update, remove };
