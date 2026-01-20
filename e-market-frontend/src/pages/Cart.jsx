import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, total, checkout } =
    useContext(CartContext);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Mon panier</h1>

      {cart.length === 0 && <p>Panier vide</p>}

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border-b py-2"
        >
          <div>
            <p className="font-semibold">{item.name}</p>
            <p>
              {item.quantity} × {item.price} FCFA
            </p>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500"
          >
            Supprimer
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h2 className="mt-4 font-bold">
            Total : {total} FCFA
          </h2>

          <button
            onClick={checkout}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Passer la commande
          </button>
        </>
      )}
    </div>
  );
}
