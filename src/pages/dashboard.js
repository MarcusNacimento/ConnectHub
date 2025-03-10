import { useEffect, useState } from "react";

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [editingIdea, setEditingIdea] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    async function fetchIdeas() {
      const res = await fetch("/api/ideas/list");
      const data = await res.json();
      setIdeas(data);
    }

    fetchIdeas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingIdea ? `/api/ideas/edit/${editingIdea.id}` : "/api/ideas/create";
    const method = editingIdea ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const newIdea = await res.json();

    if (editingIdea) {
      setIdeas(ideas.map((idea) => (idea.id === editingIdea.id ? newIdea : idea)));
      setEditingIdea(null);
    } else {
      setIdeas([...ideas, newIdea]);
    }

    setForm({ title: "", description: "" });
  };

  const handleEdit = (idea) => {
    setEditingIdea(idea);
    setForm({ title: idea.title, description: idea.description });
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/ideas/delete/${id}`, { method: "DELETE" });

    if (res.ok) {
      setIdeas(ideas.filter((idea) => idea.id !== id));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard - Ideias</h1>

      {/* Formulário para adicionar ou editar ideia */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título da Ideia"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição da Ideia"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">{editingIdea ? "Atualizar" : "Adicionar"} Ideia</button>
        {editingIdea && <button onClick={() => setEditingIdea(null)}>Cancelar</button>}
      </form>

      {/* Lista de ideias */}
      <ul>
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <li key={idea.id}>
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
              <button onClick={() => handleEdit(idea)}>Editar</button>
              <button onClick={() => handleDelete(idea.id)}>Excluir</button>
            </li>
          ))
        ) : (
          <p>Carregando ideias...</p>
        )}
      </ul>
    </div>
  );
}
