import { useGreetings } from "@/hooks/use-greetings";
import { MinimalCard } from "@/components/MinimalCard";
import { motion } from "framer-motion";
import { ArrowRight, LogOut, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@shared/routes";

type AuthMode = "login" | "register";
type AuthUser = {
  id: number;
  username: string;
};

export default function Home() {
  const { data: greetings, isLoading, error } = useGreetings();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [authValues, setAuthValues] = useState({ username: "", password: "" });
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) return;
    try {
      setAuthUser(JSON.parse(storedUser));
    } catch (error) {
      localStorage.removeItem("authUser");
    }
  }, []);

  // Determine what to display
  const message = greetings && greetings.length > 0 
    ? greetings[0].message 
    : "Welcome to your new app.";

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    setAuthNotice(null);
    setIsAuthLoading(true);

    const payload = {
      username: authValues.username.trim(),
      password: authValues.password,
    };

    const endpoint =
      authMode === "login" ? api.auth.login.path : api.auth.register.path;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setAuthError(data?.message ?? "Unable to authenticate.");
        return;
      }

      setAuthUser(data);
      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthValues({ username: "", password: "" });
      setAuthNotice(
        authMode === "login"
          ? `Welcome back, ${data.username}.`
          : `Account created. Welcome, ${data.username}.`
      );
    } catch (error) {
      setAuthError("Unable to reach the server.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem("authUser");
    setAuthNotice("You have been signed out.");
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* Decorative gradient blur in background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-gray-100 to-gray-50 blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-gray-100 to-gray-50 blur-3xl opacity-60" />
      </div>

      <div className="max-w-3xl w-full z-10 space-y-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border shadow-sm text-xs font-medium text-muted-foreground mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Simple Start</span>
          </div>
        </motion.div>

        <MinimalCard className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl shadow-black/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 md:max-w-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Authentication</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">
                {authUser ? `Welcome, ${authUser.username}.` : "Sign in to continue"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Use your existing credentials or create a new login to personalize the experience.
              </p>
              {authNotice ? (
                <p className="text-sm font-medium text-emerald-600">{authNotice}</p>
              ) : null}
              {authError ? (
                <p className="text-sm font-medium text-destructive">{authError}</p>
              ) : null}
            </div>

            <div className="w-full md:max-w-sm">
              {authUser ? (
                <div className="space-y-4 rounded-2xl border border-border/60 bg-white/70 p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">Signed in</p>
                    <p className="text-xs text-muted-foreground">
                      You can now access the full home experience.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-muted-foreground transition hover:text-primary"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-border/60 bg-white/70 p-4 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className={`rounded-full px-3 py-1 transition ${
                        authMode === "login"
                          ? "bg-primary text-primary-foreground"
                          : "hover:text-primary"
                      }`}
                    >
                      Sign in
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode("register")}
                      className={`rounded-full px-3 py-1 transition ${
                        authMode === "register"
                          ? "bg-primary text-primary-foreground"
                          : "hover:text-primary"
                      }`}
                    >
                      Create account
                    </button>
                  </div>
                  <form className="space-y-3" onSubmit={handleAuthSubmit}>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground" htmlFor="username">
                        Username
                      </label>
                      <input
                        id="username"
                        name="username"
                        autoComplete="username"
                        value={authValues.username}
                        onChange={(event) =>
                          setAuthValues((prev) => ({ ...prev, username: event.target.value }))
                        }
                        className="w-full rounded-xl border border-border/70 bg-white px-3 py-2 text-sm text-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={authMode === "login" ? "current-password" : "new-password"}
                        value={authValues.password}
                        onChange={(event) =>
                          setAuthValues((prev) => ({ ...prev, password: event.target.value }))
                        }
                        className="w-full rounded-xl border border-border/70 bg-white px-3 py-2 text-sm text-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isAuthLoading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
                    >
                      {isAuthLoading
                        ? "Checking..."
                        : authMode === "login"
                        ? "Sign in"
                        : "Create account"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </MinimalCard>

        {/* Main Content Card */}
        <MinimalCard className="text-center py-20 md:py-32 bg-white/80 backdrop-blur-sm border-white/20 shadow-xl shadow-black/[0.02]">
          {!authUser ? (
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                Sign in or create an account to unlock your personalized home page.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-2 border-primary/10 border-t-primary rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground animate-pulse">Loading experience...</p>
            </div>
          ) : error ? (
            <div className="space-y-3">
              <p className="text-destructive font-medium">Unable to connect</p>
              <p className="text-sm text-muted-foreground">Please check your connection and try again.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-display text-primary leading-[1.1] tracking-tight"
              >
                {message}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto font-light leading-relaxed text-balance"
              >
                A clean foundation for your next big idea. 
                Simple, fast, and ready to scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-8"
              >
                <button 
                  onClick={() => console.log("Get started clicked")}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:pr-6 hover:pl-10 overflow-hidden"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Get Started</span>
                  <ArrowRight className="w-4 h-4 relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
              </motion.div>
            </div>
          )}
        </MinimalCard>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-between items-center text-xs text-muted-foreground/60 px-4"
        >
          <p>© 2024 Design System</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
