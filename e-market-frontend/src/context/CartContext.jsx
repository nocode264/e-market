import { createContext, useState } from "react";
import api from "../services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((p) => p._id === product._id);

    if (existing) {
      setCart(
        cart.map((p) =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p._id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const checkout = async () => {
    const items = cart.map((p) => ({
      productId: p._id,
      quantity: p.quantity,
    }));

    await api.post("/orders", { items });
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        total,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
