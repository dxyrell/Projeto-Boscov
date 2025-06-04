const Router = require('express').Router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../prisma/prismaClient');
const { StatusCodes } = require('http-status-codes');

const router = Router();

const SECRET = process.env.JWT_SECRET || 'chave-muito-segura';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: 
 *      - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        tipo: usuario.tipoUsuario,
        nome: usuario.nome,
        email: usuario.email,
      },
      SECRET,
      { expiresIn: '2h' }
    );

    res.status(StatusCodes.OK).json({
      mensagem: 'Login realizado com sucesso',
      token,
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

module.exports = router;