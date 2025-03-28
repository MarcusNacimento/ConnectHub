import jwt from 'jsonwebtoken';
import pool from '../utils/db';
import cookie from 'cookie';

export async function verifyToken(req) {
  const rawCookie = req.headers?.cookie || '';
  let token = '';

  try {
    const parsed = cookie.parse(rawCookie);
    token = parsed.token;
  } catch (err) {
    console.error('❌ Erro ao fazer parse dos cookies:', err); 
  }

  if (!token) {
    console.error('❌ Token ausente nos cookies.');
    return { valid: false };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRes = await pool.query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [decoded.id]
    );

    if (userRes.rows.length === 0) {
      console.error('❌ Usuário não encontrado no banco.');
      return { valid: false };
    }

    return { valid: true, user: userRes.rows[0] };
  } catch (err) {
    console.error('❌ Erro ao verificar token:', err);
    return { valid: false };
  }
}
