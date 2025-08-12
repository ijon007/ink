'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface ColorOption {
  name: string;
  value: string;
  bgColor: string;
  borderColor: string;
}

export const ICON_COLORS: ColorOption[] = [
  { name: 'Gray', value: 'gray', bgColor: 'bg-gray-500', borderColor: 'border-gray-500' },
  { name: 'Red', value: 'red', bgColor: 'bg-red-500', borderColor: 'border-red-500' },
  { name: 'Orange', value: 'orange', bgColor: 'bg-orange-500', borderColor: 'border-orange-500' },
  { name: 'Yellow', value: 'yellow', bgColor: 'bg-yellow-500', borderColor: 'border-yellow-500' },
  { name: 'Green', value: 'green', bgColor: 'bg-green-500', borderColor: 'border-green-500' },
  { name: 'Blue', value: 'blue', bgColor: 'bg-blue-500', borderColor: 'border-blue-500' },
  { name: 'Purple', value: 'purple', bgColor: 'bg-purple-500', borderColor: 'border-purple-500' },
  { name: 'Pink', value: 'pink', bgColor: 'bg-pink-500', borderColor: 'border-pink-500' },
  { name: 'Brown', value: 'brown', bgColor: 'bg-amber-700', borderColor: 'border-amber-700' },
  { name: 'Teal', value: 'teal', bgColor: 'bg-teal-500', borderColor: 'border-teal-500' },
  { name: 'Indigo', value: 'indigo', bgColor: 'bg-indigo-500', borderColor: 'border-indigo-500' },
  { name: 'Slate', value: 'slate', bgColor: 'bg-slate-500', borderColor: 'border-slate-500' },
  { name: 'Lime', value: 'lime', bgColor: 'bg-lime-500', borderColor: 'border-lime-500' },
  { name: 'Emerald', value: 'emerald', bgColor: 'bg-emerald-500', borderColor: 'border-emerald-500' },
  { name: 'Cyan', value: 'cyan', bgColor: 'bg-cyan-500', borderColor: 'border-cyan-500' },
  { name: 'Sky', value: 'sky', bgColor: 'bg-sky-500', borderColor: 'border-sky-500' },
  { name: 'Violet', value: 'violet', bgColor: 'bg-violet-500', borderColor: 'border-violet-500' },
  { name: 'Fuchsia', value: 'fuchsia', bgColor: 'bg-fuchsia-500', borderColor: 'border-fuchsia-500' },
  { name: 'Rose', value: 'rose', bgColor: 'bg-rose-500', borderColor: 'border-rose-500' },
  { name: 'Stone', value: 'stone', bgColor: 'bg-stone-500', borderColor: 'border-stone-500' },
  { name: 'Zinc', value: 'zinc', bgColor: 'bg-zinc-500', borderColor: 'border-zinc-500' },
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  trigger?: React.ReactNode;
}

export function ColorPicker({ value, onChange, trigger }: ColorPickerProps) {
  const [open, setOpen] = React.useState(false);

  const currentColor = ICON_COLORS.find(color => color.value === value) || ICON_COLORS[0];

  const handleColorSelect = (colorValue: string) => {
    onChange(colorValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-neutral-100"
          >
            <div className={cn(
              'h-3 w-3 rounded-full border',
              currentColor.bgColor,
              currentColor.borderColor
            )} />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2" align="start">
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-900">Choose Color</h4>
          <div className="grid grid-cols-5 gap-1">
            {ICON_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color.value)}
                className={cn(
                  'h-6 w-6 rounded-full border transition-all hover:scale-110',
                  color.bgColor,
                  color.borderColor,
                  value === color.value && 'ring-2 ring-offset-1 ring-blue-500'
                )}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
