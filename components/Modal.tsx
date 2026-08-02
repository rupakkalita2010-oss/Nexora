"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
};

export function Modal({ children, isOpen, onClose, title, className = "" }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose} role="presentation">
          <motion.section
            aria-label={title}
            aria-modal="true"
            className={`modal ${className}`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="modal-topline">
              {title ? <h2>{title}</h2> : <span />}
              <button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button>
            </div>
            {children}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
