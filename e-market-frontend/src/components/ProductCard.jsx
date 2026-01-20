import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4">
      <Link to={`/products/${product._id}`}>
        <h2 className="font-bold text-lg hover:underline">
          {product.name}
        </h2>
      </Link>

      <p className="text-sm text-gray-500">{product.category}</p>

      <p className="text-green-600 font-bold my-2">
        {product.price} FCFA
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
