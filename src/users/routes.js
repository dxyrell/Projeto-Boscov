const Router = require('express').Router;
const userController = require('./controller');

const router = Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
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
 *                 description: Nome do usuário
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *               tipoUsuario:
 *                 type: string
 *                 description: Tipo do usuário
 *                 example: admin
 *               status:
 *                 type: boolean
 *                 description: Se o usuário está ativo
 *                 example: true
 *               apelido:
 *                 type: string
 *                 description: Apelido do usuário (opcional)
 *                 example: joaos
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do usuário
 *                 example: 2000-01-01
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 */
router.post('/', userController.create);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retorna todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/', userController.getAll);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retorna um usuário específico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', userController.getById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
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
router.put('/:id', userController.update);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', userController.remove);

module.exports = router;
