import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({erro: "Requisicao sem token"})
  };
  const authHeaderSeparado = authHeader.split(" ");
  const token = authHeaderSeparado[1];

  try {
    const validacao = jwt.verify(token, process.env.JWT_SECRET);
    req.user = validacao;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({erro: "Token invalido"})
  }
};