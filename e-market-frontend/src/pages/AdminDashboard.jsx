import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // 🔐 Protection admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // 📊 Chargement des données admin
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const statsRes = await api.get("/admin/stats");
        const usersRes = await api.get("/admin/users");
        const ordersRes = await api.get("/orders");

        setStats(statsRes.data);
        setUsers(usersRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error("Erreur chargement admin :", error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

      {/* 📈 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Utilisateurs" value={stats.users} />
        <StatCard title="Produits" value={stats.products} />
        <StatCard title="Commandes" value={stats.orders} />
        <StatCard title="Revenus" value={`${stats.revenue || 0} FCFA`} />
      </div>

      {/* 👥 UTILISATEURS */}
      <AdminSection title="Utilisateurs">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center border-t">
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminSection>

      {/* 📦 COMMANDES */}
      <AdminSection title="Commandes">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>Client</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="text-center border-t">
                <td>{o.user?.name}</td>
                <td>{o.totalPrice} FCFA</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminSection>

      {/* 🧰 GESTION */}
      <AdminSection title="Gestion">
        <Link
          to="/admin/products"
          className="block p-6 border rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">📦 Gestion des produits</h2>
          <p className="text-gray-600 mt-2">
            Ajouter, modifier ou supprimer des produits
          </p>
        </Link>
      </AdminSection>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value }) => (
  <div className="p-4 bg-white shadow rounded text-center">
    <p className="text-gray-500">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const AdminSection = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="font-bold mb-3">{title}</h2>
    {children}
  </div>
);
