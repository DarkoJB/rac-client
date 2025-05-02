import useToast from "../../hooks/useToast";
import { ToastType } from "../../shared/interfaces";
import "./toast-container.css";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const getToastClass = (type: ToastType) => {
    return `toast toast-${type}`;
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={getToastClass(toast.type)}
          onAnimationEnd={(e) => {
            if (e.animationName === "fadeOut") {
              removeToast(toast.id);
            }
          }}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="toast-close-btn"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
