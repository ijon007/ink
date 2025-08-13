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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
 

interface IconPickerProps {
    value: string;
    iconColor: string;
    onChange: (iconName: string) => void;
    onColorChange: (color: string) => void;
    trigger?: React.ReactNode;
}

export function IconPicker({ value, iconColor, onChange, onColorChange, trigger }: IconPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [activeIcon, setActiveIcon] = React.useState<string | null>(null);
  const [colorMenuFor, setColorMenuFor] = React.useState<string | null>(null);

  const CurrentIcon = ICON_MAP[value] || FileText;

  const handleIconSelect = (iconName: string, iconColor: string) => {
    setOpen(false);
    onChange(iconName);
    onColorChange(iconColor);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) setActiveIcon(null);
      }}
    >
      <PopoverTrigger className="hover:bg-neutral-100 p-1 rounded-md">
        {trigger ? (
          trigger
        ) : (
          <CurrentIcon className={cn("h-6 w-6", getIconColorClasses(iconColor))} />
        )}
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <div className="relative flex">
          <div className="w-72 border-r">
            <Command>
              <CommandInput placeholder="Search icons..." className="h-8 text-sm" />
              <CommandList className="max-h-60">
                <CommandEmpty>No icons found.</CommandEmpty>
                {Object.entries(ICON_CATEGORIES).map(([category, icons]) => (
                  <CommandGroup key={category} heading={category} className="text-xs">
                    {icons.map((iconName) => {
                      const IconComponent = ICON_MAP[iconName];
                      const isSelected = value === iconName;
                      const isActive = activeIcon === iconName;

                      if (!IconComponent) return null;

                      return (
                        <DropdownMenu key={iconName} open={colorMenuFor === iconName} onOpenChange={(isOpen) => setColorMenuFor(isOpen ? iconName : null)}>
                          <DropdownMenuTrigger asChild>
                            <CommandItem
                              value={`${iconName} ${category}`}
                              onSelect={() => {
                                setActiveIcon(iconName);
                                setColorMenuFor(iconName);
                              }}
                              className={cn(
                                "flex items-center gap-2 h-8 cursor-pointer",
                                isActive && "bg-neutral-100"
                              )}
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
                          </DropdownMenuTrigger>
                          {colorMenuFor === iconName && (
                            <DropdownMenuContent side="right" align="start" className="p-2">
                              <div className="grid grid-cols-8 gap-2">
                                {ICON_COLORS.map((color) => (
                                  <DropdownMenuItem
                                    key={color.value}
                                    className="p-0"
                                    onClick={() => {
                                      handleIconSelect(iconName, color.value);
                                      setColorMenuFor(null);
                                    }}
                                  >
                                    <IconComponent className={cn("h-4 w-4", getIconColorClasses(color.value))} />
                                  </DropdownMenuItem>
                                ))}
                              </div>
                            </DropdownMenuContent>
                          )}
                        </DropdownMenu>
                      );
                    })}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </div>
          {/* color dropdowns are portalized by Radix; nothing needed on the right */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
