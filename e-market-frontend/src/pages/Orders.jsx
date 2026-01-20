import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my-orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Mes commandes</h1>

      {orders.length === 0 && <p>Aucune commande</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded p-4 mb-4"
        >
          <p className="font-semibold">
            Commande #{order._id.slice(-6)}
          </p>
          <p>Status : {order.status}</p>
          <p>Total : {order.totalPrice} FCFA</p>
        </div>
      ))}
    </div>
  );
}
