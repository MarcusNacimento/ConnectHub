import pool from '../../../utils/db';
import { verifyToken } from '../../../middleware/verifyToken';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { valid, user } = await verifyToken(req);

    if (!valid) {
      return res.status(401).json({ error: 'Acesso não autorizado.' });
    }

    const { id } = req.query;

    try {
      const result = await pool.query(
        'DELETE FROM ideas WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, user.id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Ideia não encontrada ou não pertence a você.' });
      }

      res.status(200).json({ message: 'Ideia deletada com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
