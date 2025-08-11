'use client';

import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AlignKit } from '@/components/plate/align-kit';
import { AutoformatKit } from '@/components/plate/autoformat-kit';
import { BasicBlocksKit } from '@/components/plate/basic-blocks-kit';
import { BaseBasicMarksKit } from '@/components/plate/basic-marks-base-kit';
// import { BlockMenuKit } from '@/components/plate/block-menu-kit';
// import { CalloutKit } from '@/components/callout-kit';
import { CodeBlockKit } from '@/components/plate/code-block-kit';
import { ColumnKit } from '@/components/plate/column-kit';
import { CursorOverlayKit } from '@/components/plate/cursor-overlay-kit';
import { DateKit } from '@/components/plate/date-kit';
import { DndKit } from '@/components/plate/dnd-kit';
// import { DocxKit } from '@/components/docx-kit';
import { EmojiKit } from '@/components/plate/emoji-kit';
// import { ExitBreakKit } from '@/components/exit-break-kit';
import { FontKit } from '@/components/plate/font-kit'; 
import { LineHeightKit } from '@/components/plate/line-height-kit';
import { LinkKit } from '@/components/plate/link-kit';
import { ListKit } from '@/components/plate/list-kit';
import { MarkdownKit } from '@/components/plate/markdown-kit';
// import { MathKit } from '@/components/math-kit';
// import { MediaKit } from '@/components/media-kit';
import { MentionKit } from '@/components/plate/mention-kit';
import { SlashKit } from '@/components/plate/slash-kit';
import { TableKit } from '@/components/plate/table-kit';
import { ToggleKit } from '@/components/plate/toggle-kit';
import { SuggestionKit } from '@/components/plate/suggestion-kit';

export const EditorKit = [
  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  // ...TocKit,
  // ...MediaKit,
  // ...CalloutKit,
  ...ColumnKit,
  // ...MathKit,
  ...DateKit,
  ...LinkKit,
  ...MentionKit,

  // Marks
  ...BaseBasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,

  // Editing
  ...SlashKit,
  ...SuggestionKit,
  ...AutoformatKit,
  ...CursorOverlayKit,
  // ...BlockMenuKit,
  ...DndKit,
  ...EmojiKit,
  // ...ExitBreakKit,
  TrailingBlockPlugin,

  // Parsers
  // ...DocxKit,
  ...MarkdownKit,
];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();