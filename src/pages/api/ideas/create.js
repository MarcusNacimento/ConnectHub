import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { title, description, userId } = req.body;
  if (!title || !description || !userId) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

  try {
    const idea = await prisma.idea.create({
      data: { title, description, userId },
    });
    res.status(201).json(idea);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ideia' });
  }
}
