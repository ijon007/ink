'use client';

import { cn } from '@/lib/utils';
import { Button } from '@radix-ui/react-toolbar';
import { FileText } from 'lucide-react';
import { PlateElement, useSelected, useFocused, type PlateElementProps } from 'platejs/react';
import Link from 'next/link';

interface NewPageElementProps extends PlateElementProps {
  element: {
    id: string;
    type: 'new-page';
    children: any[];
  };
}

export function NewPageElement({
  className,
  children,
  element,
  ...props
}: NewPageElementProps) {
  const selected = useSelected();
  const focused = useFocused();
  
  if (!element || !element.id) {
    console.warn('NewPageElement: element or element.id is undefined', element);
    return null;
  }

  return (
    <PlateElement
      element={element}
      {...props}
      className={cn(
        'relative my-4',
        selected && focused && 'rounded-md',
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <Link href={`/app/${element.id}`}>
          <Button className="h-8">
            <FileText className="h-4 w-4" />
            New Page
          </Button>
        </Link>
      </div>
      {children}
    </PlateElement>
  );
}