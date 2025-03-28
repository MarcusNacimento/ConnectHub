  import pool from '../../../utils/db';

  export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const result = await pool.query(`
          SELECT ideas.*, users.name AS user_name
          FROM ideas
          INNER JOIN users ON ideas.user_id = users.id
          ORDER BY ideas.id DESC
        `);

        res.status(200).json({ ideas: result.rows });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.status(405).json({ error: 'Método não permitido' });
    }
  }
