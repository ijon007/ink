'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Edit2, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlateElement, useSelected, useFocused, type PlateElementProps } from 'platejs/react';
import { useState, useEffect } from 'react';

interface FormInputElementProps extends PlateElementProps {
  element: {
    id: string;
    type: 'form-input';
    label?: string;
    placeholder?: string;
    required?: boolean;
    children: any[];
  };
}

export function FormInputElement({
  className,
  children,
  element,
  ...props
}: FormInputElementProps) {
  const selected = useSelected();
  const focused = useFocused();
  const [labelText, setLabelText] = useState(element?.label || 'Text Input');
  const [placeholderText, setPlaceholderText] = useState(element?.placeholder || 'Enter text...');
  
  // Debug logging
  console.log('FormInputElement rendered with props:', { className, children, element, ...props });
  
  // Defensive programming: ensure element exists and has required properties
  if (!element || !element.id) {
    console.warn('FormInputElement: element or element.id is undefined', element);
    return null;
  }
  
  // Get plugin options if available
  const required = element?.required || false;

  // Update local state when element changes
  useEffect(() => {
    setLabelText(element?.label || 'Text Input');
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
        selected && focused && 'ring-1 ring-blue-500/50 rounded-md',
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {/* Header with edit toggle button */}
        <div className="flex items-center gap-2">
          <Input
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="text-sm font-medium h-8 w-32"
            placeholder="Label text..."
          />
        </div>

        {/* Placeholder input when editing */}
        {/* Remove the edit toggle buttons section entirely */}

        {/* Actual form input */}
        <Input 
          placeholder={placeholderText} 
          className="w-full"
          contentEditable={false}
          required={required}
        />
      </div>
      {children}
    </PlateElement>
  );
}
