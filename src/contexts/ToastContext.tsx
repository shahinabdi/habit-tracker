import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const styles: Record<ToastType, { iconColor: string; icon: React.ElementType }> = {
  success: { iconColor: 'text-status-completed', icon: CheckCircle2 },
  error: { iconColor: 'text-status-missed', icon: XCircle },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 z-50 flex flex-col gap-2 sm:max-w-sm">
        {toasts.map(toast => {
          const { iconColor, icon: Icon } = styles[toast.type];
          return (
            <div
              key={toast.id}
              className="flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg bg-surface border border-edge text-ink animate-view-enter"
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
              <span className="flex-1 text-sm font-medium">{toast.message}</span>
              <button
                onClick={() => dismiss(toast.id)}
                className="text-faint hover:text-soft transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};
