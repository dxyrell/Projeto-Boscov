function checkUserId(req, res, next) {
  const { id } = req.params;
  const { usuario } = req;

  if (usuario.tipoUsuario === 'user' && parseInt(id) !== usuario.id) {
    return res.status(403).json({ error: 'Acesso permitido apenas ao seu próprio usuário' });
  }

  next();
}

module.exports = checkUserId;
