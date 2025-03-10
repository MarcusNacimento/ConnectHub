import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
