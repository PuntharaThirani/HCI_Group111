import React from 'react';

const ErrorMessage = ({ 
  message = 'Something went wrong!', 
  type = 'error',
  onRetry,
  onDismiss,
  details 
}) => {
  const typeStyles = {
    error: {
      bg: 'bg-red-50',
      border: 'border-l-4 border-red-500',
      icon: '❌',
      title: 'Error'
    },
    warning: {
      bg: 'bg-orange-50',
      border: 'border-l-4 border-orange-500',
      icon: '⚠️',
      title: 'Warning'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-l-4 border-blue-500',
      icon: 'ℹ️',
      title: 'Info'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-l-4 border-green-500',
      icon: '✅',
      title: 'Success'
    }
  };

  const style = typeStyles[type] || typeStyles.error;

  return (
    <div className={`${style.bg} ${style.border} rounded-lg p-4 mb-4 animate-slide-in`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">{style.icon}</div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{style.title}</h4>
          <p className="text-gray-600 text-sm">{message}</p>
          
          {details && (
            <details className="mt-2 text-sm text-gray-500">
              <summary className="cursor-pointer hover:text-gray-700">Technical Details</summary>
              <pre className="mt-2 p-2 bg-white/50 rounded text-xs overflow-x-auto">
                {details}
              </pre>
            </details>
          )}
        </div>

        <div className="flex gap-2">
          {onRetry && (
            <button 
              onClick={onRetry}
              className="px-3 py-1 bg-white text-gray-700 rounded-lg hover:bg-gray-100 text-sm transition-colors"
            >
              🔄 Try Again
            </button>
          )}
          
          {onDismiss && (
            <button 
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Full Page Error
export const FullPageError = ({ message, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
    <div className="text-center p-8 bg-white rounded-2xl shadow-hard max-w-md">
      <div className="text-7xl mb-4 animate-bounce-slow">😵</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-6">{message || 'We encountered an unexpected error.'}</p>
      <div className="space-x-3">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            🔄 Try Again
          </button>
        )}
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          🏠 Go Home
        </button>
      </div>
    </div>
  </div>
);

// Inline Error
export const InlineError = ({ message }) => (
  <div className="flex items-center gap-1 text-xs text-red-500 mt-1 animate-fade-in">
    <span>⚠️</span>
    <span>{message}</span>
  </div>
);

// Toast Error
export const ToastError = ({ message, type = 'error', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeColors = {
    error: 'border-red-500 bg-red-50',
    success: 'border-green-500 bg-green-50',
    warning: 'border-orange-500 bg-orange-50',
    info: 'border-blue-500 bg-blue-50'
  };

  return (
    <div className={`fixed top-5 right-5 min-w-75 max-w-md p-4 border-l-4 rounded-lg shadow-hard animate-slide-in-right z-50 ${typeColors[type]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">
            {type === 'error' && '❌'}
            {type === 'success' && '✅'}
            {type === 'warning' && '⚠️'}
            {type === 'info' && 'ℹ️'}
          </span>
          <p className="text-sm text-gray-800">{message}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;