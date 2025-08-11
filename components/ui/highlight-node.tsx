'use client';

import type { PlateLeafProps } from 'platejs/react';
import { PlateLeaf } from 'platejs/react';
import * as React from 'react';

export function HighlightLeaf(props: PlateLeafProps) {
  return (
    <PlateLeaf {...props} as="mark" className="bg-highlight/30 text-inherit">
      {props.children}
    </PlateLeaf>
  );
}
