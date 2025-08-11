'use client';

import { Plate, usePlateEditor } from 'platejs/react';
import * as React from 'react';
import { Editor, EditorContainer } from '@/components/plate/editor';
import { EditorKit } from './editor-kit';

export function PlateEditor() {
  const editor = usePlateEditor({
    plugins: EditorKit,
  });
  const titleRef = React.useRef<HTMLInputElement>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Focus the editor
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }
  };

  return (
    <div className="flex h-full flex-col">
      <input
        className="w-full border-none bg-transparent px-16 pt-4 pb-4 font-semibold text-2xl outline-none placeholder:text-muted-foreground/60 focus:placeholder:text-muted-foreground/40 sm:px-[max(64px,calc(50%-350px))]"
        onKeyDown={handleTitleKeyDown}
        placeholder="Enter title..."
        ref={titleRef}
        type="text"
      />
      <Plate editor={editor}>
        <EditorContainer>
          <Editor ref={editorRef} variant="default" />
        </EditorContainer>
      </Plate>
    </div>
  );
}
