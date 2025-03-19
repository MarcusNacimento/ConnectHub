import jwt from 'jsonwebtoken';
import pool from '../utils/db';

export async function verifyToken(req) {
  const token = req.cookies.token;

  if (!token) {
    return { valid: false };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRes = await pool.query('SELECT id, email, name FROM users WHERE id = $1', [decoded.id]);

    if (userRes.rows.length === 0) {
      return { valid: false };
    }

    return { valid: true, user: userRes.rows[0] };
  } catch (err) {
    return { valid: false };
  }
}
