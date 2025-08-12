'use client';

import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { PlateElement, useSelected, useFocused, type PlateElementProps } from 'platejs/react';
import { useState, useEffect } from 'react';

interface FormDatePickerElementProps extends PlateElementProps {
  element: {
    id: string;
    type: 'form-date-picker';
    label?: string;
    placeholder?: string;
    required?: boolean;
    selectedDate?: Date;
    children: any[];
  };
}

export function FormDatePickerElement({
  className,
  children,
  element,
  ...props
}: FormDatePickerElementProps) {
  const selected = useSelected();
  const focused = useFocused();
  const [labelText, setLabelText] = useState(element?.label || 'Date Picker');
  const [placeholderText, setPlaceholderText] = useState(element?.placeholder || 'Pick a date');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(element?.selectedDate);
  const [isOpen, setIsOpen] = useState(false);
  
  if (!element || !element.id) {
    console.warn('FormDatePickerElement: element or element.id is undefined', element);
    return null;
  }
  
  const required = element?.required || false;

  useEffect(() => {
    setLabelText(element?.label || 'Date Picker');
    setPlaceholderText(element?.placeholder || 'Pick a date');
    setSelectedDate(element?.selectedDate);
  }, [element?.label, element?.placeholder, element?.selectedDate]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const clearDate = () => {
    setSelectedDate(undefined);
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
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Input
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="text-sm font-medium h-8"
            placeholder="Label text..."
          />
          {required && <span className="text-red-500 text-sm">*</span>}
        </div>

        <div className="flex items-center gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
                contentEditable={false}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : placeholderText}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          {selectedDate && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearDate}
              className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          )}
        </div>

        <input
          type="hidden"
          name={`date-${element.id}`}
          value={selectedDate ? selectedDate.toISOString() : ''}
          required={required}
        />
      </div>
      {children}
    </PlateElement>
  );
}
