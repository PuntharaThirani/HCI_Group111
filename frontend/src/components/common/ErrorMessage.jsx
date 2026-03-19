import React from 'react';
import { Link } from 'react-router-dom';

const typeStyles = {
  error: {
    wrapper: 'border-red-200 bg-red-50',
    accent: 'text-red-600',
    title: 'Error',
    icon: '⚠️',
  },
  warning: {
    wrapper: 'border-orange-200 bg-orange-50',
    accent: 'text-orange-600',
    title: 'Warning',
    icon: '⚠️',
  },
  info: {
    wrapper: 'border-sky-200 bg-sky-50',
    accent: 'text-sky-600',
    title: 'Info',
    icon: 'ℹ️',
  },
  success: {
    wrapper: 'border-emerald-200 bg-emerald-50',
    accent: 'text-emerald-600',
    title: 'Success',
    icon: '✅',
  },
};

const ErrorMessage = ({
  message = 'Something went wrong.',
  type = 'error',
  onRetry,
  onDismiss,
  details,
}) => {
  const style = typeStyles[type] || typeStyles.error;

  return (
    <div className={`mb-4 rounded-xl border p-4 ${style.wrapper}`}>
      <div className="flex items-start gap-3">
        <div className={`text-base ${style.accent}`}>{style.icon}</div>

        <div className="flex-1">
          <h4 className="mb-1 text-sm font-semibold text-slate-800">
            {style.title}
          </h4>
          <p className="text-sm text-slate-600">{message}</p>

          {details && (
            <details className="mt-3 text-sm text-slate-500">
              <summary className="cursor-pointer font-medium hover:text-slate-700">
                Technical details
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600">
                {details}
              </pre>
            </details>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-[#C96A2B] hover:text-[#C96A2B]"
            >
              Try again
            </button>
          )}

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-600"
              aria-label="Dismiss message"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const FullPageError = ({ message, onRetry }) => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
      <div className="mb-4 text-4xl">⚠️</div>
      <h2 className="mb-2 text-2xl font-semibold text-slate-800">
        Something went wrong
      </h2>
      <p className="mb-6 text-sm leading-6 text-slate-600">
        {message || 'We encountered an unexpected error.'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-xl bg-[#C96A2B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B95D20]"
          >
            Try again
          </button>
        )}

        <Link
          to="/"
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#C96A2B] hover:text-[#C96A2B]"
        >
          Go home
        </Link>
      </div>
    </div>
  </div>
);

export const InlineError = ({ message }) => (
  <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
    <span>⚠️</span>
    <span>{message}</span>
  </div>
);

export const ToastError = ({ message, type = 'error', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const style = typeStyles[type] || typeStyles.error;

  return (
    <div className="fixed right-5 top-5 z-50 w-[320px] max-w-[calc(100vw-2rem)]">
      <div className={`rounded-xl border p-4 shadow-lg ${style.wrapper}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className={`text-base ${style.accent}`}>{style.icon}</span>
            <p className="text-sm text-slate-700">{message}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-white hover:text-slate-600"
            aria-label="Close toast"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;