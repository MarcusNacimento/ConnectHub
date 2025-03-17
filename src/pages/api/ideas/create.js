import pool from '../../../utils/db';
import { verifyToken } from '../../../middleware/verifyToken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { valid, user } = await verifyToken(req);

    if (!valid) {
      return res.status(401).json({ error: 'Acesso não autorizado.' });
    }

    const { title, description } = req.body;

    try {
      await pool.query(
        'INSERT INTO ideas (title, description, user_id) VALUES ($1, $2, $3)',
        [title, description, user.id]
      );
      res.status(201).json({ message: 'Ideia criada com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
