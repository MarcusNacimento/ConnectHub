import pool from '../../../utils/db';
import { verifyToken } from '../../../middleware/verifyToken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { valid, user } = await verifyToken(req);

  if (!valid) {
    return res.status(401).json({ error: 'Acesso não autorizado.' });
  }

  const { ideaId } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM ideas WHERE id = $1', [ideaId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Ideia não encontrada' });
    }

    const idea = rows[0];

    const liked = idea.likes_users?.includes(user.id); 

    await pool.query(
      'UPDATE ideas SET likes = likes + $1 WHERE id = $2',
      [liked ? -1 : 1, ideaId]
    );

    return res.status(200).json({ message: liked ? 'Like removido' : 'Like adicionado' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
