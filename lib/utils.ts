import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIconColorClasses(color: string): string {
  const colorMap: Record<string, string> = {
    gray: 'text-gray-500',
    red: 'text-red-500',
    orange: 'text-orange-500',
    yellow: 'text-yellow-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    pink: 'text-pink-500',
    brown: 'text-amber-700',
    teal: 'text-teal-500',
    indigo: 'text-indigo-500',
    slate: 'text-slate-500',
  };
  
  return colorMap[color] || 'text-gray-500';
}
