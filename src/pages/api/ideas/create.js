import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // 🔹 Busca o primeiro usuário existente no banco
    const user = await prisma.user.findFirst();
    if (!user) {
      return res.status(400).json({ error: "Nenhum usuário encontrado. Cadastre um usuário primeiro." });
    }

    // 🔹 Agora criamos a ideia associada ao usuário encontrado
    const newIdea = await prisma.idea.create({
      data: { 
        title, 
        description, 
        userId: user.id // 🔥 Agora temos certeza que o userId é válido!
      },
    });

    console.log("Ideia criada:", newIdea);
    res.status(201).json(newIdea);
  } catch (error) {
    console.error("Erro ao criar ideia:", error);
    res.status(500).json({ error: "Erro ao criar ideia", details: error.message });
  }
}
