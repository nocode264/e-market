import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null));
  }, [id]);

  if (!product)
    return <p className="text-center mt-10">Produit introuvable</p>;

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
    </div>
  );
}
