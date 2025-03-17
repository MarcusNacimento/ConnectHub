import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function verifyToken(req) {
  try {
    const cookie = req.headers.cookie || '';
    const token = cookie
      .split('; ')
      .find((c) => c.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return { valid: false, user: null };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, user: decoded };
  } catch (err) {
    return { valid: false, user: null };
  }
}
