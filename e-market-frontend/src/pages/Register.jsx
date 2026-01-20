import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Inscription réussie");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Erreur");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 border rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">Inscription</h2>

        <input
          name="name"
          placeholder="Nom"
          onChange={handleChange}
          className="w-full mb-3 p-2 border"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border"
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          className="w-full mb-3 p-2 border"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full mb-3 p-2 border"
        >
          <option value="user">Acheteur</option>
          <option value="seller">Vendeur</option>
        </select>

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          S’inscrire
        </button>
      </form>
    </div>
  );
}
