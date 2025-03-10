import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const ideas = await prisma.idea.findMany();
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar ideias" });
  }
}
