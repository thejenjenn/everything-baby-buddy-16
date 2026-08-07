import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { createRegistry, fetchOwnRegistry } from "@/lib/registryApi";

const RegistryNewPage = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Create your registry | Everything Baby";
    if (loading) return;
    if (!session) navigate("/registry/login", { replace: true });
    else {
      fetchOwnRegistry().then((existing) => {
        if (existing) navigate("/registry/dashboard", { replace: true });
      });
    }
  }, [session, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createRegistry({
        ownerName,
        ownerEmail: session?.user.email ?? "",
        dueDate: dueDate || null,
        optionalMessage: message.trim() || null,
        shippingAddress,
      });
      navigate("/registry/dashboard", { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (/already_has_registry/.test(msg)) {
        navigate("/registry/dashboard", { replace: true });
      } else {
        setError("Sorry, we could not create your registry. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Create your registry
        </h1>
        <p className="mt-3 font-body text-muted-foreground">
          A few details to get you started. You can edit any of this later.
        </p>

        <Card className="mt-8 rounded-2xl border border-border bg-card">
          <CardContent className="p-8">
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="reg-name" className="font-body">
                  Your name (as guests will see it)
                </Label>
                <Input
                  id="reg-name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-due" className="font-body">
                  Baby's due date (optional)
                </Label>
                <Input
                  id="reg-due"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-msg" className="font-body">
                  A short message for guests (optional)
                </Label>
                <Textarea
                  id="reg-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="e.g. Thank you so much for celebrating with us."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-addr" className="font-body">
                  Shipping address
                </Label>
                <Textarea
                  id="reg-addr"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                  rows={3}
                />
                <p className="text-xs text-muted-foreground font-body">
                  Your address is shared only with guests who claim items from an external retailer, so they can post the gift to you. It is never shown on the public registry page.
                </p>
              </div>

              {error && (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 font-body text-sm text-destructive">
                  {error}
                </p>
              )}

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={submitting} className="font-body font-medium">
                  {submitting ? "Creating..." : "Create registry"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default RegistryNewPage;
