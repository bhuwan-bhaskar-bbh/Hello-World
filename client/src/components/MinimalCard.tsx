import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MinimalCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MinimalCard({ children, className = "", delay = 0 }: MinimalCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // Custom ease for premium feel
        delay 
      }}
      className={`
        bg-white border border-border/40 
        rounded-2xl p-8 md:p-12
        shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]
        hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.04)]
        transition-shadow duration-500
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
