const Router = require('express').Router;
const controller = require('./controller');

const router = Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Cadastra uma nova avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 8
 *               comentario:
 *                 type: string
 *                 example: Muito bom!
 *               idUsuario:
 *                 type: integer
 *                 example: 1
 *               idFilme:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 */
router.post('/', controller.create);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Lista todas as avaliações
 *     responses:
 *       200:
 *         description: Lista de avaliações
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Retorna uma avaliação específica
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *       404:
 *         description: Avaliação não encontrada
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Remove uma avaliação
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Avaliação removida com sucesso
 */
router.delete('/:id', controller.remove);

module.exports = router;
