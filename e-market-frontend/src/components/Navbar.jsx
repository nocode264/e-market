import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        E-Market
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-gray-300">Produits</Link>

        {user && <Link to="/cart">Panier</Link>}
        {user && <Link to="/orders">Mes commandes</Link>}

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
          >
            Admin
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="bg-green-600 px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
          
        )}
      </div>
    </nav>
  );
}
