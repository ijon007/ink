'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { ICON_CATEGORIES, ICON_MAP } from '@/lib/icons';

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
    trigger?: React.ReactNode;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = React.useState(false);

  const CurrentIcon = ICON_MAP[value] || FileText;

  const handleIconSelect = (iconName: string) => {
    onChange(iconName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="hover:bg-neutral-100 p-1 rounded-md">
        <CurrentIcon className="h-8 w-8" />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search icons..." />
          <CommandList>
            <CommandEmpty>No icons found.</CommandEmpty>
            {Object.entries(ICON_CATEGORIES).map(([category, icons]) => (
              <CommandGroup key={category} heading={category}>
                {icons.map((iconName) => {
                  const IconComponent = ICON_MAP[iconName];
                  const isSelected = value === iconName;
                  
                  if (!IconComponent) return null;
                  
                  return (
                    <CommandItem
                      key={iconName}
                      value={`${iconName} ${category}`}
                      onSelect={() => handleIconSelect(iconName)}
                      className="flex items-center gap-3"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{iconName}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
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
      </PopoverContent>
    </Popover>
  );
}
