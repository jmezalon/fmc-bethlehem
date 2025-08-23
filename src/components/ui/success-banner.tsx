'use client';

import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuccessBannerProps {
  title: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export function SuccessBanner({ title, message, onClose, className }: SuccessBannerProps) {
  return (
    <div className={cn(
      "bg-green-50 border border-green-200 rounded-lg p-4 mb-6",
      className
    )}>
      <div className="flex items-start">
        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-green-800 mb-1">
            {title}
          </h3>
          <p className="text-sm text-green-700">
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-green-400 hover:text-green-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
