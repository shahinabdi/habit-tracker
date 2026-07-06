import React from 'react';
import { DayCategory, TaskStatus } from '../../utils/habitStats';

export type VisualStatus = DayCategory | TaskStatus;

type Size = 'sm' | 'md' | 'lg';

interface StatusIconProps {
  status: VisualStatus;
  size?: Size;
  className?: string;
}

const dotSize: Record<Size, string> = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3.5 h-3.5',
};

const dashSize: Record<Size, string> = {
  sm: 'w-2 h-0.5',
  md: 'w-2.5 h-0.5',
  lg: 'w-3.5 h-1',
};

// Shape + color for each status: filled dot = done/in-progress, hollow ring = nothing to report,
// short dash = missed. Color always carries the same meaning across Daily/Weekly/Monthly.
const config: Record<VisualStatus, { shape: 'filled' | 'hollow' | 'dash'; className: string }> = {
  completed: { shape: 'filled', className: 'bg-status-completed' },
  partial: { shape: 'filled', className: 'bg-status-partial' },
  postponed: { shape: 'hollow', className: 'border-status-partial' },
  missed: { shape: 'dash', className: 'bg-status-missed' },
  upcoming: { shape: 'hollow', className: 'border-status-none' },
  none: { shape: 'hollow', className: 'border-status-none' },
};

export const StatusIcon: React.FC<StatusIconProps> = ({ status, size = 'md', className = '' }) => {
  const { shape, className: colorClass } = config[status];

  if (shape === 'dash') {
    return <span className={`inline-block rounded-full ${dashSize[size]} ${colorClass} ${className}`} />;
  }

  if (shape === 'hollow') {
    return (
      <span
        className={`inline-block rounded-full border-2 ${dotSize[size]} ${colorClass} ${className}`}
      />
    );
  }

  return <span className={`inline-block rounded-full ${dotSize[size]} ${colorClass} ${className}`} />;
};
