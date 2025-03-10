import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id } = req.query;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const updatedIdea = await prisma.idea.update({
      where: { id },
      data: { title, description },
    });

    res.status(200).json(updatedIdea);
  } catch (error) {
    console.error("Erro ao atualizar ideia:", error);
    res.status(500).json({ error: "Erro ao atualizar ideia", details: error.message });
  }
}
