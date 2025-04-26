// src/hooks/useSession.js
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/features/auth/useAuth";

export default function useSession() {
  const { user, token, loading } = useUser();
  const { isAuthenticated } = useAuth();

  return {
    user,
    token,
    isAuthenticated,
    loading,
  };
}
