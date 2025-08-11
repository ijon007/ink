'use client';

import { MessageSquareTextIcon } from 'lucide-react';
import { useEditorRef } from 'platejs/react';
import * as React from 'react';

import { commentPlugin } from '@/components/comment-kit';

import { ToolbarButton } from './toolbar';

export function CommentToolbarButton() {
  const editor = useEditorRef();

  return (
    <ToolbarButton
      data-plate-prevent-overlay
      onClick={() => {
        editor.getTransforms(commentPlugin).comment.setDraft();
      }}
      tooltip="Comment"
    >
      <MessageSquareTextIcon />
    </ToolbarButton>
  );
}
