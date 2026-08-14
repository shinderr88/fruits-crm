import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-bg/70" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4 rounded-lg bg-surface border border-line shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="text-sm font-display font-bold text-text">{title}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
