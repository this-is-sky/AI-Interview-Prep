import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow px-6 py-4 flex justify-between">
        <h1
          className="text-xl font-bold text-primary cursor-pointer"
          onClick={() => navigate("/")}
        >
          AI Interview Prep
        </h1>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="text-sm text-gray-600 hover:text-primary"
        >
          Logout
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-6">{children}</main>
    </div>
  );
}
