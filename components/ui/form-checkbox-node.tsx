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
  
  if (!element || !element.id) {
    console.warn('FormCheckboxElement: element or element.id is undefined', element);
    return null;
  }
  
  const required = element?.required || false;
  const checked = element?.checked || false;

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
        selected && focused && 'ring-1 ring-blue-500/50 rounded-md',
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