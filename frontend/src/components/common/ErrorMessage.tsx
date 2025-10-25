import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="error-container">
      <div className="error-message">
        <p>{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-retry">
          Reintentar
        </button>
      )}
    </div>
  );
};