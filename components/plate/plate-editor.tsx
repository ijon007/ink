'use client';

import { Plate, usePlateEditor } from 'platejs/react';
import * as React from 'react';
import { Editor, EditorContainer } from '@/components/plate/editor';
import { EditorKit } from './editor-kit';
import { useNotesStore, type Note } from '@/lib/stores/notes-store';
import { useDebounce } from '@/hooks/use-debounce';

interface PlateEditorProps {
  note: Note;
}

export function PlateEditor({ note }: PlateEditorProps) {
  const { updateNote } = useNotesStore();
  const editor = usePlateEditor({
    plugins: EditorKit,
  });
  const titleRef = React.useRef<HTMLInputElement>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [content, setContent] = React.useState<any[]>([]);
  const [title, setTitle] = React.useState(note?.title || 'Untitled Note');
  const [isSaving, setIsSaving] = React.useState(false);
  
  // Debounce content updates to avoid too many store updates while typing
  const debouncedContent = useDebounce(content, 1000);
  const debouncedTitle = useDebounce(title, 500);

  // Early return if note is not available
  if (!note) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-muted-foreground">Loading note...</p>
      </div>
    );
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Focus the editor
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }
  };

  const handleContentChange = (options: { editor: any; value: any[] }) => {
    setContent(options.value);
  };

  const handleEditorBlur = () => {
    // Immediately save content when editor loses focus
    if (content.length > 0) {
      setIsSaving(true);
      const contentString = JSON.stringify(content);
      updateNote(note.id, { content: contentString });
      setTimeout(() => setIsSaving(false), 1000);
    }
  };

  // Initialize content from note
  React.useEffect(() => {
    if (note.content && note.content !== 'Start writing your note here...') {
      try {
        const parsedContent = JSON.parse(note.content);
        setContent(parsedContent);
      } catch (error) {
        console.error('Failed to parse note content:', error);
        setContent([]);
      }
    } else {
      setContent([]);
    }
  }, [note.content]);

  // Sync local title state when note changes
  React.useEffect(() => {
    setTitle(note.title);
  }, [note.title]);

  // Update store when debounced content changes
  React.useEffect(() => {
    if (debouncedContent.length > 0 || note.content !== 'Start writing your note here...') {
      setIsSaving(true);
      const contentString = JSON.stringify(debouncedContent);
      updateNote(note.id, { content: contentString });
      setTimeout(() => setIsSaving(false), 1000);
    }
  }, [debouncedContent, note.id, updateNote, note.content]);

  // Update store when debounced title changes
  React.useEffect(() => {
    if (debouncedTitle && debouncedTitle.trim() !== '' && debouncedTitle !== note.title) {
      setIsSaving(true);
      updateNote(note.id, { title: debouncedTitle.trim() });
      setTimeout(() => setIsSaving(false), 1000);
    }
  }, [debouncedTitle, note.id, updateNote, note.title]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-16 pt-4 pb-4 sm:px-[max(64px,calc(50%-350px))]">
        <input
          className="w-full border-none bg-transparent font-semibold text-2xl outline-none placeholder:text-muted-foreground/60 focus:placeholder:text-muted-foreground/40"
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
          placeholder="Enter title..."
          ref={titleRef}
          type="text"
          value={title}
        />
        {isSaving && (
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-muted-foreground"></div>
            Saving...
          </div>
        )}
      </div>
      <Plate 
        editor={editor}
        onChange={handleContentChange}
      >
        <EditorContainer>
          <Editor 
            ref={editorRef} 
            variant="default" 
            onBlur={handleEditorBlur}
          />
        </EditorContainer>
      </Plate>
    </div>
  );
}
