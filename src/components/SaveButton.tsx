import React from 'react';
import { Save } from 'lucide-react';

interface SaveButtonProps {
  onSave: () => void;
  className?: string;
  disabled?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave, className = '', disabled = false }) => {
  return (
    <button
      onClick={onSave}
      disabled={disabled}
      className={`fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center gap-2 z-50 transition-all duration-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
      } ${className}`}
    >
      <Save className="w-5 h-5" />
      <span className="hidden md:inline">
        {disabled ? 'All Changes Saved' : 'Save Changes'}
      </span>
    </button>
  );
};

export default SaveButton; 