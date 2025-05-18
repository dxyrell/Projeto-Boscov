const prisma = require('../../prisma/prismaClient');
const { StatusCodes } = require('http-status-codes')
const userSchema = require('./user.shema')

const z = require('zod')

const create = async (req, res) => {

    try {

        //Faz a validação com o Zod
        const validate = userSchema.safeParse(req.body);

        //Devolve erro caso a validação falhe
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const { name, email, password, date_birth } = validate.data;

        // Verificação de unicidade do e-mail (manual, já que Zod não faz isso)
        // Também é possível pensar nessa solução a partir de uma outra função, caso essa busca faça sentido em outros pontos do sistema
        const verifyEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (verifyEmail) {
            return res.status(StatusCodes.CONFLICT).json({
                error: "Este e-mail já está cadastrado",
            });
        }

        // Criação do usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                date_birth: new Date(date_birth)
            },
        });

        // Retorna o usuário criado com o status correto baseado no protocolo HTTP.
        res.status(StatusCodes.CREATED).json(user);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors });
        }
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível criar o usuário" });
    }
}

const getAll = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível buscar os usuários" });
    }
}

module.exports = { create, getAll }
