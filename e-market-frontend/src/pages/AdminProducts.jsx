import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products"); // Les admins/sellers voient tous leurs produits
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setError("Impossible de charger les produits");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Erreur suppression");
    }
  };

  if (loading) return <p className="mt-10 text-center">Chargement...</p>;
  if (error) return <p className="mt-10 text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des produits</h1>

      <Link
        to="/admin/products/create"
        className="mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Ajouter un produit
      </Link>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Catégorie</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center border-t">
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price} FCFA</td>
              <td>{p.stock}</td>
              <td className="space-x-2">
                <Link
                  to={`/admin/products/edit/${p._id}`}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
