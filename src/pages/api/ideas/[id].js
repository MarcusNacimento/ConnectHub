import pool from '../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const result = await pool.query(`
      SELECT ideas.*, users.name AS user_name
      FROM ideas
      JOIN users ON ideas.user_id = users.id
      WHERE ideas.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ideia não encontrada' });
    }

    res.status(200).json({ idea: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
