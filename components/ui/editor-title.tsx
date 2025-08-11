'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type EditorTitleProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSubmit?: () => void;
};

export const EditorTitle = React.forwardRef<HTMLTextAreaElement, EditorTitleProps>(
  ({ value, onChange, placeholder = 'Untitled', className, onSubmit }, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

    React.useEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }, [value]);

    return (
      <textarea
        ref={innerRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit?.();
          }
        }}
        placeholder={placeholder}
        rows={1}
        spellCheck
        className={cn(
          'w-full resize-none overflow-hidden bg-transparent outline-none ring-0 focus-visible:outline-none focus-visible:ring-0',
          'text-3xl font-bold leading-tight md:text-4xl',
          'placeholder:text-muted-foreground/60',
          className
        )}
      />
    );
  }
);

EditorTitle.displayName = 'EditorTitle';


