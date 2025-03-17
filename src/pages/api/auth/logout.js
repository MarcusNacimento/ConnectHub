export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');
    res.status(200).json({ message: 'Logout realizado com sucesso!' });
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
