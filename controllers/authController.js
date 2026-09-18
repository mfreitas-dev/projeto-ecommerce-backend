import Admin from "../models/Admin.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }

    const senhaValida = await bcrypt.compare(password, user.password);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }    

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' }) 
    
    console.log('Login realizado com sucesso!');
    return res.status(200).json({ 
      message: 'Login realizado com sucesso!',
      auth: token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};