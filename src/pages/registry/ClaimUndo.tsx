import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { undoClaim } from "@/lib/registryApi";

const ClaimUndoPage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<"idle" | "working" | "done" | "expired" | "error">("idle");

  useEffect(() => {
    document.title = "Undo claim | Everything Baby";
  }, []);

  const doUndo = async () => {
    if (!token) return;
    setState("working");
    try {
      const ok = await undoClaim(token);
      setState(ok ? "done" : "expired");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-md px-4 py-16">
        <Card className="rounded-2xl border border-border">
          <CardContent className="p-8 text-center">
            {!token ? (
              <p className="font-body text-muted-foreground">
                Missing undo token. Please use the link from your confirmation email.
              </p>
            ) : state === "idle" ? (
              <>
                <h1 className="font-heading text-2xl font-bold text-foreground">
                  Undo your claim
                </h1>
                <p className="mt-3 font-body text-muted-foreground">
                  This will release the item so someone else can claim it.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button asChild variant="outline" className="font-body">
                    <Link to="/">Cancel</Link>
                  </Button>
                  <Button onClick={doUndo} className="font-body">
                    Undo my claim
                  </Button>
                </div>
              </>
            ) : state === "working" ? (
              <p className="font-body text-muted-foreground">Working...</p>
            ) : state === "done" ? (
              <>
                <h1 className="font-heading text-2xl font-bold text-foreground">
                  Claim released
                </h1>
                <p className="mt-3 font-body text-muted-foreground">
                  The item is available again. Thanks for letting us know.
                </p>
              </>
            ) : state === "expired" ? (
              <>
                <h1 className="font-heading text-2xl font-bold text-foreground">
                  Link no longer valid
                </h1>
                <p className="mt-3 font-body text-muted-foreground">
                  Undo links work for 24 hours after you claim. Please contact the parent directly.
                </p>
              </>
            ) : (
              <p className="font-body text-destructive">
                Something went wrong. Please try again.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ClaimUndoPage;
