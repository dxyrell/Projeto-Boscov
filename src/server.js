const express = require("express")
const swggerUi = require("swagger-ui-express")
const swaggerDocs = require('./configs/SwaggerConfig')

const user = require('./users/routes')

const app = express()

app.use(express.json())

app.use('/api-docs', swggerUi.serve, swggerUi.setup(swaggerDocs))

app.use('/user', user)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});
