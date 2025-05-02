import { ToastContextType } from "../contexts/ToastContext";

let globalToast: ToastContextType["toast"];

export const initializeToast = (toastInstance: typeof globalToast): void => {
  globalToast = toastInstance;
};

export const toast = {
  success: (message: string, duration?: number) =>
    globalToast?.success(message, duration),
  warn: (message: string, duration?: number) =>
    globalToast?.warn(message, duration),
  error: (message: string, duration?: number) =>
    globalToast?.error(message, duration),
  info: (message: string, duration?: number) =>
    globalToast?.info(message, duration),
};
