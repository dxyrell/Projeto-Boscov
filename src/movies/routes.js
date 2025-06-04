const Router = require('express').Router;
const movieController = require('./controller');
const verifyToken = require('../middlewares/verifyToken'); // middleware de autenticação
const authorize = require('../middlewares/authorize');

const router = Router();

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Cadastra um novo filme
 *     tags:
 *       - Filmes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Toy Story 3
 *               diretor:
 *                 type: string
 *                 example: Lee Unkrich
 *               anoLancamento:
 *                 type: integer
 *                 example: 2010
 *               duracao:
 *                 type: integer
 *                 example: 103
 *               produtora:
 *                 type: string
 *                 example: Pixar Animation Studios
 *               classificacao:
 *                 type: string
 *                 example: Livre
 *               poster:
 *                 type: string
 *                 format: url
 *                 example: https://m.media-amazon.com/images/I/81xRxNj2uUL._AC_SY679_.jpg
 *               generos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 4]
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', verifyToken, authorize(['admin']), movieController.create);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Lista todos os filmes
 *     tags:
 *       - Filmes
 *     responses:
 *       200:
 *         description: Lista de filmes
 */
router.get('/', movieController.getAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Retorna um filme específico
 *     tags:
 *       - Filmes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme encontrado
 *       404:
 *         description: Filme não encontrado
 */
router.get('/:id', movieController.getById);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Atualiza um filme existente
 *     tags:
 *       - Filmes
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
 *               diretor:
 *                 type: string
 *               anoLancamento:
 *                 type: integer
 *               duracao:
 *                 type: integer
 *               produtora:
 *                 type: string
 *               classificacao:
 *                 type: string
 *               poster:
 *                 type: string
 *               generos:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', verifyToken, authorize(['admin']), movieController.update);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Remove um filme
 *     tags:
 *       - Filmes
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
 *         description: Filme removido com sucesso
 *       404:
 *         description: Filme não encontrado
 */
router.delete('/:id', verifyToken, authorize(['admin']), movieController.remove);

module.exports = router;
