import React from 'react';

export const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    {children}
  </div>
);

export const AlertDescription = ({ children }) => (
  <p className="text-sm">{children}</p>
);