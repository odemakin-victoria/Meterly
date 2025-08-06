import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  className?: string;
  headText?: string;
  paragraphText?: string;
  contentLabel?: string;
  children: React.ReactNode;
  onClose?: () => void;
  onOverlayClose?: () => void;
  hasLogo?: boolean;
};

const Modal = ({
  isOpen = false,
  children,
  headText,
  paragraphText,
  className,
  onClose,
  onOverlayClose,
  hasLogo,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="overlay bg-[#EA5B0C] opacity-70 absolute inset-0"
            onClick={onOverlayClose}
          />
          <motion.div
            className={`modal overflow-y-auto bg-white pt-8 px-5 ${
              hasLogo ? "pb-8" : "pb-8"
            } xss:px-8 rounded shadow relative ${className}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={(e) => e.stopPropagation()} // Prevent overlay close
          >
            {onClose && (
              <button
                className="close-button absolute top-[1rem] right-[1rem] font-bold text-grayText"
                onClick={onClose}
                type="button"
              >
                X
              </button>
            )}
            <div className="overflow-y-auto max-h-100">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
