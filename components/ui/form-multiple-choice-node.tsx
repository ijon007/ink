'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlateElement, useSelected, useFocused, type PlateElementProps } from 'platejs/react';
import { useState, useEffect } from 'react';

interface FormMultipleChoiceElementProps extends PlateElementProps {
  element: {
    id: string;
    type: 'form-multiple-choice';
    label?: string;
    required?: boolean;
    options?: string[];
    selectedValue?: string;
    children: any[];
  };
}

export function FormMultipleChoiceElement({
  className,
  children,
  element,
  ...props
}: FormMultipleChoiceElementProps) {
  const selected = useSelected();
  const focused = useFocused();
  const [labelText, setLabelText] = useState(element?.label || 'Multiple Choice');
  const [options, setOptions] = useState<string[]>(element?.options || ['Option 1', 'Option 2']);
  const [selectedValue, setSelectedValue] = useState(element?.selectedValue || '');
  
  if (!element || !element.id) {
    console.warn('FormMultipleChoiceElement: element or element.id is undefined', element);
    return null;
  }
  
  const required = element?.required || false;

  useEffect(() => {
    setLabelText(element?.label || 'Multiple Choice');
    setOptions(element?.options || ['Option 1', 'Option 2']);
    setSelectedValue(element?.selectedValue || '');
  }, [element?.label, element?.options, element?.selectedValue]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (selectedValue === options[index]) {
        setSelectedValue('');
      }
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
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
            placeholder="Question text..."
          />
          {required && <span className="text-red-500 text-sm">*</span>}
        </div>

        <RadioGroup 
          value={selectedValue} 
          onValueChange={setSelectedValue}
          className="space-y-2"
        >
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={option} 
                id={`option-${element.id}-${index}`}
                contentEditable={false}
                required={required}
              />
              <Input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="text-sm h-7 flex-1"
                placeholder="Option text..."
              />
              {options.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(index)}
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </RadioGroup>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addOption}
          className="w-fit h-8 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Option
        </Button>
      </div>
      {children}
    </PlateElement>
  );
}
