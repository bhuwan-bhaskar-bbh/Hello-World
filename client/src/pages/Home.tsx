import { useGreetings } from "@/hooks/use-greetings";
import { MinimalCard } from "@/components/MinimalCard";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const { data: greetings, isLoading, error } = useGreetings();

  // Determine what to display
  const message = greetings && greetings.length > 0 
    ? greetings[0].message 
    : "Welcome to your new app.";

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col items-center justify-center p-4 md:p-8">
      
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

        {/* Main Content Card */}
        <MinimalCard className="text-center py-20 md:py-32 bg-white/80 backdrop-blur-sm border-white/20 shadow-xl shadow-black/[0.02]">
          {isLoading ? (
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
