import { verifyToken } from '../../../middleware/verifyToken';

export default async function handler(req, res) {

  console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET); 

  const { valid, user } = await verifyToken(req);

  if (!valid) {
    return res.status(401).json({ error: 'Não autenticado.' });
  }

  res.status(200).json({ user });
}
