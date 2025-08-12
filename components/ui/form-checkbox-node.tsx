'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PlateElement, useSelected, useFocused, type PlateElementProps } from 'platejs/react';
import { useState, useEffect } from 'react';

interface FormCheckboxElementProps extends PlateElementProps {
  element: {
    id: string;
    type: 'form-checkbox';
    label?: string;
    required?: boolean;
    checked?: boolean;
    children: any[];
  };
}

export function FormCheckboxElement({
  className,
  children,
  element,
  ...props
}: FormCheckboxElementProps) {
  const selected = useSelected();
  const focused = useFocused();
  const [labelText, setLabelText] = useState(element?.label);
  
  // Defensive programming: ensure element exists and has required properties
  if (!element || !element.id) {
    console.warn('FormCheckboxElement: element or element.id is undefined', element);
    return null;
  }
  
  // Get plugin options if available
  const required = element?.required || false;
  const checked = element?.checked || false;

  // Update local state when element changes
  useEffect(() => {
    setLabelText(element?.label);
  }, [element?.label]);

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
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="form-checkbox"
          contentEditable={false}
          checked={checked}
          required={required}
        />
        
        <Input
          value={labelText}
          onChange={(e) => setLabelText(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="text-sm font-medium h-8 focus:ring-0"
          placeholder="Label text..."
        />
      </div>
      {children}
    </PlateElement>
  );
}