import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔎 filtres
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products", {
        params: {
          category: category || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        },
      });
      setProducts(res.data);
      setError("");
    } catch {
      setError("Impossible de charger les produits");
    } finally {
      setLoading(false);
    }
  };

  // chargement initial
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Produits</h1>

      {/* FILTRES */}
     <form
  onSubmit={handleFilter}
  className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end"
>
  <input
    type="text"
    placeholder="Catégorie"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="p-2 border rounded"
  />

  <input
    type="number"
    placeholder="Prix min"
    value={minPrice}
    onChange={(e) => setMinPrice(e.target.value)}
    className="p-2 border rounded"
  />

  <input
    type="number"
    placeholder="Prix max"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
    className="p-2 border rounded"
  />

  <button
    type="submit"
    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 font-semibold w-full"
  >
    🔍 Filtrer
  </button>
</form>


      {/* 📦 LISTE PRODUITS */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">Aucun produit trouvé</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
