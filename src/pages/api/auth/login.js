import pool from '../../../utils/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const user = result.rows[0];

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: 'Senha inválida.' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`);

      res.status(200).json({ message: 'Login bem-sucedido!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
