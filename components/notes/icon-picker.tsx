'use client';

import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check, FileText } from 'lucide-react';
import { cn, getIconColorClasses } from '@/lib/utils';
import { ICON_CATEGORIES, ICON_MAP } from '@/lib/icons';
import { ICON_COLORS } from '@/components/ui/color-picker';

interface IconPickerProps {
    value: string;
    iconColor: string;
    onChange: (iconName: string) => void;
    onColorChange: (color: string) => void;
    trigger?: React.ReactNode;
}

export function IconPicker({ value, iconColor, onChange, onColorChange, trigger }: IconPickerProps) {
  const [open, setOpen] = React.useState(false);

  const CurrentIcon = ICON_MAP[value] || FileText;

  const handleIconSelect = (iconName: string) => {
    onChange(iconName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="hover:bg-neutral-100 p-1 rounded-md">
        <CurrentIcon className={cn("h-6 w-6", getIconColorClasses(iconColor))} />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search icons..." className="h-8 text-sm" />
          <CommandList className="max-h-48">
            <CommandEmpty>No icons found.</CommandEmpty>
            {Object.entries(ICON_CATEGORIES).map(([category, icons]) => (
              <CommandGroup key={category} heading={category} className="text-xs">
                {icons.map((iconName) => {
                  const IconComponent = ICON_MAP[iconName];
                  const isSelected = value === iconName;
                  
                  if (!IconComponent) return null;
                  
                  return (
                    <CommandItem
                      key={iconName}
                      value={`${iconName} ${category}`}
                      onSelect={() => handleIconSelect(iconName)}
                      className="flex items-center gap-2 h-8"
                    >
                      <IconComponent className={cn("h-3 w-3", getIconColorClasses(iconColor))} />
                      <span className="text-xs">{iconName}</span>
                      <Check
                        className={cn(
                          "ml-auto h-3 w-3",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
        <div className="border-t p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Color</span>
          </div>
          <div className="grid grid-cols-8 gap-1">
            {ICON_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => onColorChange(color.value)}
                className={cn(
                  'h-5 w-5 rounded-full border transition-all hover:scale-110',
                  color.bgColor,
                  color.borderColor,
                  iconColor === color.value && 'ring-2 ring-offset-1 ring-blue-500'
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
