import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { ToastType } from "../shared/interfaces";
import ToastContainer from "../components/ToastContainer/ToastContainer";
import { initializeToast } from "../utils/toast";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastContextType {
  toasts: Toast[];
  toast: {
    success: (message: string, duration?: number) => void;
    warn: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
  };
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0)
      setTimeout(() => {
        removeToast(id);
      }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toast = {
    success: (message: string, duration?: number) =>
      addToast(message, "success", duration),
    warn: (message: string, duration?: number) =>
      addToast(message, "warn", duration),
    error: (message: string, duration?: number) =>
      addToast(message, "error", duration),
    info: (message: string, duration?: number) =>
      addToast(message, "info", duration),
  };

  useEffect(() => {
    initializeToast(toast);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, toast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
