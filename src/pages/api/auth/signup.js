import pool from '../../../utils/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
      const exists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (exists.rowCount > 0) {
        return res.status(409).json({ error: 'E-mail já cadastrado.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userResult = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email',
        [name, email, hashedPassword]
      );

      const user = userResult.rows[0];

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`);

      res.status(201).json({ message: 'Usuário criado e logado com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
