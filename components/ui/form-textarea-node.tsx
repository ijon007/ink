'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PlateElement, useSelected, useFocused } from 'platejs/react';
import * as React from 'react';

export function FormTextareaElement({
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
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Text Area</Label>
        <Textarea 
          placeholder="Enter text..." 
          className="w-full min-h-[100px]"
          contentEditable={false}
        />
      </div>
      {children}
    </PlateElement>
  );
}
