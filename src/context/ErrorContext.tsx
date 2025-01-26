import { createContext, FC, useContext, ReactNode, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

/**
 * Interface for the ErrorContext value.
 */
interface ErrorContextProps {
  showError: (message: string) => void;
}

// Create the context for error handling
const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

/**
 * Custom hook to access the ErrorContext.
 */
export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

/**
 * Provider component to manage error notifications and make the `showError` function
 * available to its children via context.
 */
export const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  /**
   * Displays an error message in a toast notification.
   * @param message - The error message to display.
   */
  const showError = (message: string) => {
    setErrorMessage(message);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setErrorMessage(null);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <ToastContainer position="top-start" className="pt-5">
        <Toast onClose={handleClose} show={show} bg="danger" delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{errorMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ErrorContext.Provider>
  );
};
