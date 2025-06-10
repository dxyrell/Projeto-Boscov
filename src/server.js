const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require('./configs/SwaggerConfig');

const auth = require('./auth/routes');
const user = require('./users/routes');
const movie = require('./movies/routes');
const reviewRoutes = require('./reviews/routes');

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
});

app.use('/auth', auth);
app.use('/user', user);
app.use('/movies', movie);
app.use('/reviews', reviewRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});