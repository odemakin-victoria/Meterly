import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

const slideRightVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

type PageTransitorProps = {
  children: ReactNode;
  className?: string;
  timeout?: number;
  onBackBtnClick?: () => void;
};

const PageTransitor: React.FC<PageTransitorProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="z-10 relative example"
      variants={slideRightVariants}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitor;

