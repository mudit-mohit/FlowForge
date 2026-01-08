import React, { useEffect } from 'react';
import { useStore } from './store';

export const Toasts = () => {
  const toasts = useStore((s) => s.toasts);
  const removeToast = useStore((s) => s.removeToast);

  useEffect(() => {
    // auto-dismiss logic: set timers for any toasts that have a duration
    const timers = toasts
      .filter((t) => t.duration !== undefined && t.duration > 0)
      .map((t) => {
        const tm = setTimeout(() => removeToast(t.id), t.duration);
        return { id: t.id, tm };
      });

    return () => timers.forEach((t) => clearTimeout(t.tm));
  }, [toasts, removeToast]);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type || 'info'}`}>
          <div className="toast__body">
            <div className="toast__title">{t.title}</div>
            <div className="toast__message">{t.message}</div>
          </div>
          <button className="toast__close" onClick={() => removeToast(t.id)} aria-label="Close">✕</button>
        </div>
      ))}
    </div>
  );
};

export default Toasts;
