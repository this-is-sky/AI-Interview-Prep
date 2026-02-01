import { useContext } from "react";
import { AuthContext } from "../context/AuthContextValue";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext error");
  return ctx;
}
