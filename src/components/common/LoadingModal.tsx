import React from 'react';
import { LoaderIcon } from 'react-hot-toast';

const LoadingModal: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <LoaderIcon className="h-12 w-12 animate-spin text-teal-500" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Loading Content</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we fetch the latest posts...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
