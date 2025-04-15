import React from 'react';

const LoadingSpinner = ({ height = "min-h-screen" }) => {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
    </div>
  );
};

export default LoadingSpinner;
