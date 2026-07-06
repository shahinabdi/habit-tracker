import React from 'react';
import { getPasswordStrength } from '../../utils/passwordStrength';

const config = {
  empty: { label: '', bars: 0, color: '' },
  weak: { label: 'Weak', bars: 1, color: 'bg-status-missed' },
  medium: { label: 'Medium', bars: 2, color: 'bg-status-partial' },
  strong: { label: 'Strong', bars: 3, color: 'bg-status-completed' },
};

export const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const strength = getPasswordStrength(password);
  if (strength === 'empty') return null;

  const { label, bars, color } = config[strength];

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex gap-1 flex-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < bars ? color : 'bg-gray-100'}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-400 font-medium w-12 text-right">{label}</span>
    </div>
  );
};
