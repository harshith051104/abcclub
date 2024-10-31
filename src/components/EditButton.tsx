import React from 'react';
import { Pencil } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EditButtonProps {
  onClick: () => void;
}

export default function EditButton({ onClick }: EditButtonProps) {
  const { isEditor } = useAuth();

  if (!isEditor) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-amber-500 hover:bg-amber-600 text-black p-3 rounded-full shadow-lg transition-colors duration-200"
      title="Edit"
    >
      <Pencil size={24} />
    </button>
  );
}