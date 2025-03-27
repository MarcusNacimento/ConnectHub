import jwt from 'jsonwebtoken';
import pool from '../utils/db';
import cookie from 'cookie';

export async function verifyToken(req) {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;

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
    console.error('Erro ao verificar token:', err);
    return { valid: false };
  }
}
