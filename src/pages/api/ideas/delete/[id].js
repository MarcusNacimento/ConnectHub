import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id } = req.query;

  try {
    await prisma.idea.delete({
      where: { id },
    });

    res.status(200).json({ message: "Ideia excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir ideia:", error);
    res.status(500).json({ error: "Erro ao excluir ideia", details: error.message });
  }
}
