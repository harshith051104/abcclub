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
      className={`button-28 fixed bottom-8 right-8 inline-flex items-center justify-center px-6 py-2 text-base font-semibold rounded-xl
        border-2 border-green-600 text-green-600
        hover:bg-green-600 hover:text-white
        transition-all duration-300 ease-in-out
        min-h-0 min-w-0 w-auto
        hover:shadow-lg hover:shadow-green-600/20
        active:transform active:translate-y-0
        disabled:opacity-50 disabled:cursor-not-allowed z-50 ${className}`}
    >
      <Save className="w-5 h-5 mr-2" />
      <span className="hidden md:inline">
        {disabled ? 'All Changes Saved' : 'Save Changes'}
      </span>
    </button>
  );
};

export default SaveButton; 