'use client';

import { useRouter } from 'next/navigation';
import Modal from './Modal';

interface LoginPromptProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  action?: string;
}

const LoginPrompt = ({ 
  isOpen, 
  onClose, 
  message = "You need to be logged in to perform this action.",
  action = "add items to cart"
}: LoginPromptProps) => {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push('/login');
  };

  const handleRegister = () => {
    onClose();
    router.push('/register');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Login Required"
      size="sm"
      closeOnOverlayClick={true}
    >
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
          <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        
        <p className="text-gray-600 mb-6">
          {message.includes(action) ? message : `${message} Please login to ${action}.`}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Create Account
          </button>
        </div>
        
        <p className="mt-4 text-xs text-gray-500">
          Don't have an account? Create one to start shopping!
        </p>
      </div>
    </Modal>
  );
};

export default LoginPrompt;
