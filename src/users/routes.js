const Router = require('express').Router;
const userController = require('./controller');
const verifyToken = require('../middlewares/verifyToken');
const authorize = require('../middlewares/authorize');
const checkUserId = require('../middlewares/checkUserId');


const router = Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: 
 *       - Usuários
 *     description: Cria um novo usuário com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *               tipoUsuario:
 *                 type: string
 *                 example: admin
 *               status:
 *                 type: boolean
 *                 example: true
 *               apelido:
 *                 type: string
 *                 example: joaos
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *                 example: 2000-01-01
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 */
router.post('/', verifyToken, userController.create);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: 
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get(
  '/',
  verifyToken,
  authorize(['admin']), // Somente admin pode listar todos
  userController.getAll
);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retorna um usuário específico
 *     tags: 
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get(
  '/:id',
  verifyToken,
  authorize(['admin', 'user']), // Ambos podem acessar, mas...
  checkUserId, // ...users apenas seu próprio ID
  userController.getById
);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: 
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipoUsuario:
 *                 type: string
 *               status:
 *                 type: boolean
 *               apelido:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.put(
  '/:id',
  verifyToken,
  authorize(['admin', 'user']),
  checkUserId,
  userController.update
);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: 
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete(
  '/:id',
  verifyToken,
  authorize(['admin']),
  userController.remove
);

module.exports = router;
