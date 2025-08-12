'use client';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PlateElement, useSelected, useFocused, type PlateElementProps } from 'platejs/react';
import { useState, useEffect } from 'react';

interface FormTextareaElementProps extends PlateElementProps {
  element: {
    id: string;
    type: 'form-textarea';
    label?: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    children: any[];
  };
}

export function FormTextareaElement({
  className,
  children,
  element,
  ...props
}: FormTextareaElementProps) {
  const selected = useSelected();
  const focused = useFocused();
  const [labelText, setLabelText] = useState(element?.label || 'Text Area');
  const [placeholderText, setPlaceholderText] = useState(element?.placeholder || 'Enter text...');
  
  // Defensive programming: ensure element exists and has required properties
  if (!element || !element.id) {
    console.warn('FormTextareaElement: element or element.id is undefined', element);
    return null;
  }
  
  // Get plugin options if available
  const required = element?.required || false;
  const rows = element?.rows || 4;

  // Update local state when element changes
  useEffect(() => {
    setLabelText(element?.label || 'Text Area');
    setPlaceholderText(element?.placeholder || 'Enter text...');
  }, [element?.label, element?.placeholder]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <PlateElement
      element={element}
      {...props}
      className={cn(
        'relative my-4',
        selected && focused && 'ring-2 ring-ring ring-offset-2',
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="text-sm font-medium h-8"
            placeholder="Label text..."
          />
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">Placeholder:</p>
          <Input
            value={placeholderText}
            onChange={(e) => setPlaceholderText(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="text-sm h-7 flex-1"
            placeholder="Enter placeholder text..."
          />
        </div>

        <Textarea 
          placeholder={placeholderText} 
          className="w-full min-h-[100px]"
          contentEditable={false}
          required={required}
          rows={rows}
        />
      </div>
      {children}
    </PlateElement>
  );
}