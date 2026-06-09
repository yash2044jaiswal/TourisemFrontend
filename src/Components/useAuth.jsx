import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Auth Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    isAuthenticated: !!user,
  };
}