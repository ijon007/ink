'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PlateElement, useSelected, useFocused } from 'platejs/react';
import * as React from 'react';

export function FormCheckboxElement({
  className,
  children,
  ...props
}: any) {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <PlateElement
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
        />
        <Label htmlFor="form-checkbox" className="text-sm font-medium">
          Checkbox Option
        </Label>
      </div>
      {children}
    </PlateElement>
  );
}
