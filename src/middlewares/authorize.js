function authorize(allowedRoles) {
  return (req, res, next) => {
    const { usuario } = req;
    
    if (!usuario) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    if (!allowedRoles.includes(usuario.tipo)) {
      return res.status(403).json({ error: 'Acesso negado: permissão insuficiente' });
    }

    next();
  };
}

module.exports = authorize;
