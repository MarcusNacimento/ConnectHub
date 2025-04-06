import * as cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0),
        path: '/',
      })
    );

    res.status(200).json({ message: 'Logout realizado com sucesso!' });
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
