import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/users/profile").then((res) => {
      setForm({ ...form, name: res.data.name, email: res.data.email });
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/profile", form);
      setMessage("Profil mis à jour avec succès");
      setForm({ ...form, password: "" });
    } catch {
      setMessage("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Mon profil</h1>

      {message && <p className="mb-3 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Nouveau mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
