'use client';

import { BlockSelectionPlugin } from '@platejs/selection/react';

export const BlockSelectionKit = [
  BlockSelectionPlugin.configure({
    options: {
      // Enable context menu support
      enableContextMenu: true,
    },
  }),
];
