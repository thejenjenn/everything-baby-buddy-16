import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { fetchOwnRegistry } from "@/lib/registryApi";

/**
 * Supabase's detectSessionInUrl processes the tokens in the URL fragment
 * automatically. Once we have a session, decide where the user should land.
 */
const RegistryAuthCallbackPage = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate("/registry/login", { replace: true });
      return;
    }
    (async () => {
      try {
        const existing = await fetchOwnRegistry();
        navigate(existing ? "/registry/dashboard" : "/registry/new", { replace: true });
      } catch {
        navigate("/registry/new", { replace: true });
      }
    })();
  }, [session, loading, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-body text-muted-foreground">
      Signing you in...
    </div>
  );
};

export default RegistryAuthCallbackPage;
