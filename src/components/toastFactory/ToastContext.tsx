import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import Toast, {ToastType, Position, ToastProps} from "./Toast"; // Ensure the path is correct

interface ToastWithContext extends ToastProps {
  id: string;
  autoHide: boolean;
  duration: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, position: Position, autoHide?: boolean, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastWithContext[]>([]);

  const showToast = useCallback((message: string, type: ToastType, position: Position, autoHide = true, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type, position, autoHide, duration }]);
    if (autoHide) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, duration);
    }
  }, []);

  return (
      <ToastContext.Provider value={{ showToast }}>
        {children}
        <div className="toast-container">
          {toasts.map((toast) => (
              <Toast
                  key={toast.id}
                  id={toast.id}
                  message={toast.message}
                  type={toast.type}
                  position={toast.position}
                  autoHide={toast.autoHide}
                  duration={toast.duration}
                  onClose={() => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))}
              />
          ))}
        </div>
      </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Re-export ToastType and Position
export { ToastType, Position };
