import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch {
      setProduct(null);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post(`/products/${id}/reviews`, {
        rating: Number(rating),
        comment,
      });

      setComment("");
      setRating(5);
      setSuccess("Avis ajouté avec succès");
      fetchProduct(); 
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Impossible d'ajouter l'avis (connexion requise)"
      );
    }
  };

  if (!product) {
    return <p className="text-center mt-10">Produit introuvable</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.category}</p>
      <p className="my-4">{product.description}</p>

      <p className="text-green-600 font-bold text-xl">
        {product.price} FCFA
      </p>

      <p className="text-sm text-gray-500 mt-2">
        Vendu par {product.seller?.name}
      </p>

      <p className="mt-2">
        ⭐ {product.rating?.toFixed(1) || "0.0"} / 5 (
        {product.numReviews || 0} avis)
      </p>

      {/* 🔎 LISTE DES AVIS */}
      <div className="mt-6">
        <h2 className="font-bold text-lg mb-2">Avis</h2>

        {product.reviews?.length === 0 ? (
          <p className="text-gray-500">Aucun avis</p>
        ) : (
          product.reviews?.map((r) => (
            <div key={r._id} className="border-b py-2">
              <p className="font-semibold">
                {r.name} — ⭐ {r.rating}/5
              </p>
              <p className="text-sm text-gray-600">{r.comment}</p>
            </div>
          ))
        )}
      </div>

      {/*FORMULAIRE AVIS */}
      <form onSubmit={submitReview} className="mt-4">
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 mr-2"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Votre avis"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 mr-2"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Envoyer
        </button>
      </form>
    </div>
  );
}
