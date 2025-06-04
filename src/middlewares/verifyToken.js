const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Pega o token do header

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.usuario = decoded; // salva os dados do usuário no req
    next();
  });
};

module.exports = verifyToken;
