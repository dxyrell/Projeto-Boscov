const Router = require('express').Router
const { user } = require('../../prisma/prismaClient');
const userController = require('./controller')

const router = Router()


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
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *               date_birth:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do usuário
 *                 example: 2005-01-01
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro interno do servidor ao criar o usuário
 */
router.post('/', userController.create);

/**
* @swagger
* /user:
*   get:
*     summary: Retorna todos os usuários
*     description: Retorna uma lista de todos os usuários cadastrados
*     responses:
*       200:
*         description: Lista de usuários
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID do usuário
*                     example: 1
*                   name:
*                     type: string
*                     description: Nome do usuário
*                     example: João Silva
*/
router.get('/', userController.getAll);


module.exports = router