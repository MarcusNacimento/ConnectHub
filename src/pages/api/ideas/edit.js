import pool from '../../../utils/db';
import { verifyToken } from '../../../middleware/verifyToken';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { valid, user } = await verifyToken(req);

    if (!valid) {
      return res.status(401).json({ error: 'Acesso não autorizado.' });
    }

    const { id } = req.query;
    const { title, description } = req.body;

    try {
      const result = await pool.query(
        'UPDATE ideas SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
        [title, description, id, user.id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Ideia não encontrada ou não pertence a você.' });
      }

      res.status(200).json({ message: 'Ideia atualizada com sucesso!', idea: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
