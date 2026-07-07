import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { HabitInput } from './HabitInput';

interface AddHabitSheetProps {
  open: boolean;
  onClose: () => void;
  onAddHabit: (name: string) => Promise<{ success: boolean; similarHabit?: string }>;
}

// Mobile bottom sheet wrapping the add-habit form. Closes on backdrop tap,
// the X button, Escape, or a successful add.
export const AddHabitSheet: React.FC<AddHabitSheetProps> = ({ open, onClose, onAddHabit }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleAdd = async (name: string) => {
    const result = await onAddHabit(name);
    if (result.success) onClose();
    return result;
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Add a habit">
      <div className="absolute inset-0 bg-black/30 animate-backdrop-in" onClick={onClose} />

      <div className="absolute bottom-0 inset-x-0 bg-surface rounded-t-3xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] animate-sheet-up max-h-[85vh] overflow-y-auto">
        <div className="w-10 h-1 bg-edge-strong rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-ink">New habit</h2>
          <button
            onClick={onClose}
            className="p-2.5 -m-1 rounded-xl text-faint hover:text-soft hover:bg-inset transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <HabitInput onAddHabit={handleAdd} autoFocus />
      </div>
    </div>
  );
};
