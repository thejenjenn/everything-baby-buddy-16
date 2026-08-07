import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

const RegistryLoginPage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign in to your registry | Everything Baby";
    if (!loading && session) navigate("/registry/dashboard", { replace: true });
  }, [session, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/registry/auth/callback`,
      },
    });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    } else {
      setStatus("sent");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto flex max-w-md flex-col px-4 py-20">
        <Card className="rounded-2xl border border-border bg-card">
          <CardContent className="p-8">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Sign in to your registry
            </h1>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Enter your email and we will send you a magic link. No password needed.
            </p>

            {status === "sent" ? (
              <div className="mt-6 rounded-md border border-primary/30 bg-primary/5 p-4 font-body text-sm text-foreground">
                Check your inbox. The link will sign you in and take you to your dashboard.
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="font-body">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                {errorMessage && (
                  <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 font-body text-sm text-destructive">
                    {errorMessage}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full font-body font-medium"
                >
                  {status === "sending" ? "Sending..." : "Send magic link"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default RegistryLoginPage;
