import { motion } from "framer-motion";
import { useHeader } from "./hooks/useHeader";

export const Header = ({ children }: { children: React.ReactNode }) => {
  const { hidden } = useHeader();

  return (
    <motion.header
      animate={{
        y: hidden ? "-100%" : "0%",
        transition: { ease: "circOut" },
      }}
      className="fixed top-0 w-full border-b border-b-black/10 dark:border-b-white/25 bg-white dark:bg-black z-20"
    >
      <nav className="max-w-screen-xl mx-auto py-1 flex items-center justify-between gap-8">
        {children}
      </nav>
    </motion.header>
  );
};
