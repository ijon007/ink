import React from 'react';
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface MiniLineChartProps {
  data: Array<{ value: number }>;
  color?: string;
  className?: string;
}

export function MiniLineChart({ data, color = "#3b82f6", className = "" }: MiniLineChartProps) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 h-12 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color.replace('#', '')})`}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
