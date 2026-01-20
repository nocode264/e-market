import { useState } from "react";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      alert("Produit créé");
      navigate("/products");
    } catch {
      alert("Accès refusé ou erreur");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Ajouter un produit</h2>

      <input
        name="name"
        placeholder="Nom"
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
      />
      <input
        name="price"
        type="number"
        placeholder="Prix"
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Ajouter
      </button>
    </form>
  );
}
