const { StatusCodes } = require('http-status-codes');
const z = require('zod');
const userSchema = require('./user.shema');
const service = require('./service');

const create = async (req, res) => {
  const validate = userSchema.safeParse(req.body);
  if (!validate.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
  }

  try {
    const user = await service.createUser(validate.data);
    return res.status(StatusCodes.CREATED).json(user);
  } catch (e) {
    return res.status(StatusCodes.CONFLICT).json({ error: e.message });
  }
};

const getAll = async (_, res) => {
  try {
    const users = await service.getAllUsers();
    return res.status(StatusCodes.OK).json(users);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const user = await service.getUserById(req.params.id);
    return res.status(StatusCodes.OK).json(user);
  } catch (e) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: e.message });
  }
};

const update = async (req, res) => {
  const validate = userSchema.partial().safeParse(req.body);
  if (!validate.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
  }

  try {
    const user = await service.updateUser(req.params.id, validate.data);
    return res.status(StatusCodes.OK).json(user);
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: e.message });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteUser(req.params.id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: e.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
