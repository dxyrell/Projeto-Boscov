const prisma = require('../../prisma/prismaClient');
const bcrypt = require('bcrypt');

const createUser = async ({ nome, email, senha, tipoUsuario, status, apelido, dataNascimento }) => {
  const existing = await prisma.usuario.findUnique({ where: { email } });
  if (existing) throw new Error("Email já cadastrado");

  const hashedPassword = await bcrypt.hash(senha, 10);

  return prisma.usuario.create({
    data: {
      nome,
      email,
      senha: hashedPassword,
      tipoUsuario,
      status,
      apelido,
      dataNascimento: new Date(dataNascimento),
    },
  });
};

const getAllUsers = () => prisma.usuario.findMany();

const getUserById = async (id) => {
  const user = await prisma.usuario.findUnique({ where: { id: Number(id) } });
  if (!user) throw new Error("Usuário não encontrado");
  return user;
};

const updateUser = async (id, data) => {
  if (data.senha) {
    data.senha = await bcrypt.hash(data.senha, 10);
  }
  if (data.dataNascimento) {
    data.dataNascimento = new Date(data.dataNascimento);
  }

  return prisma.usuario.update({
    where: { id: Number(id) },
    data,
  });
};

const deleteUser = async (id) => {
  return prisma.usuario.delete({ where: { id: Number(id) } });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
