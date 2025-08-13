'use client';

import { Plate, usePlateEditor } from 'platejs/react';
import * as React from 'react';
import { Editor, EditorContainer } from '@/components/plate/editor';
import { EditorKit } from './editor-kit';
import { useNotesStore, type Note } from '@/lib/stores/notes-store';
import { useDebounce } from '@/hooks/use-debounce';
import { IconPicker } from '@/components/notes/icon-picker';
import { useState } from 'react';

interface PlateEditorProps {
  note: Note;
}

// localStorage functions for note content persistence
const getNoteContent = (noteId: string): any[] | null => {
  try {
    const stored = localStorage.getItem(`note-content-${noteId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load note content from localStorage:', error);
  }
  return null;
};

const saveNoteContent = (noteId: string, content: any[]): void => {
  try {
    localStorage.setItem(`note-content-${noteId}`, JSON.stringify(content));
  } catch (error) {
    console.error('Failed to save note content to localStorage:', error);
  }
};

export function PlateEditor({ note }: PlateEditorProps) {
  const { updateNote, notes } = useNotesStore();
  const editor = usePlateEditor({
    plugins: EditorKit,
  });
  const titleRef = React.useRef<HTMLInputElement>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [content, setContent] = React.useState<any[]>([]);
  const [title, setTitle] = React.useState(note?.title || 'Untitled Note');
  const [isSaving, setIsSaving] = useState(false);

  const currentNote = React.useMemo(() => 
    notes.find(n => n.id === note.id), [notes, note.id]
  );

  React.useEffect(() => {
    console.log('PlateEditor - note prop:', note);
    console.log('PlateEditor - currentNote from store:', currentNote);
    console.log('PlateEditor - note.icon:', note?.icon);
    console.log('PlateEditor - currentNote.icon:', currentNote?.icon);
    console.log('All notes in store:', notes);
  }, [note, currentNote, notes]);

  const debouncedContent = useDebounce(content, 1000);
  const debouncedTitle = useDebounce(title, 500);

  if (!currentNote) {
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
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }
  };

  const handleContentChange = (options: { editor: any; value: any[] }) => {
    setContent(options.value);
  };

  const handleEditorBlur = () => {
    if (content.length > 0) {
      setIsSaving(true);
      // Save to localStorage for content persistence
      saveNoteContent(currentNote.id, content);
      // Also update the store for other metadata
      const contentString = JSON.stringify(content);
      updateNote(currentNote.id, { content: contentString });
      setTimeout(() => setIsSaving(false), 1000);
    }
  };

  const handleIconChange = (iconName: string) => {
    updateNote(currentNote.id, { icon: iconName });
  };

  const handleIconColorChange = (iconColor: string) => {
    updateNote(currentNote.id, { iconColor });
  };

  // Load content from localStorage on mount and when note changes
  React.useEffect(() => {
    if (currentNote?.id) {
      // Try to load from localStorage first
      const storedContent = getNoteContent(currentNote.id);
      if (storedContent && storedContent.length > 0) {
        setContent(storedContent);
        // Set editor value after content is loaded
        editor.children = storedContent;
        return;
      }
      
      // Fallback to store content if no localStorage content
      if (currentNote.content && currentNote.content !== 'Start writing your note here...') {
        try {
          const parsedContent = JSON.parse(currentNote.content);
          setContent(parsedContent);
          editor.children = parsedContent;
        } catch (error) {
          console.error('Failed to parse note content:', error);
          setContent([]);
          editor.children = [];
        }
      } else {
        setContent([]);
        editor.children = [];
      }
    }
  }, [currentNote?.id, currentNote?.content, editor]);

  React.useEffect(() => {
    setTitle(currentNote.title);
  }, [currentNote.title]);

  // Save content to localStorage when debounced content changes
  React.useEffect(() => {
    if (debouncedContent.length > 0) {
      setIsSaving(true);
      // Save to localStorage for immediate persistence
      saveNoteContent(currentNote.id, debouncedContent);
      // Also update the store
      const contentString = JSON.stringify(debouncedContent);
      updateNote(currentNote.id, { content: contentString });
      setTimeout(() => setIsSaving(false), 1000);
    }
  }, [debouncedContent, currentNote.id, updateNote]);

  React.useEffect(() => {
    if (debouncedTitle && debouncedTitle.trim() !== '' && debouncedTitle !== currentNote.title) {
      setIsSaving(true);
      updateNote(currentNote.id, { title: debouncedTitle.trim() });
      setTimeout(() => setIsSaving(false), 1000);
    }
  }, [debouncedTitle, currentNote.id, updateNote, currentNote.title]);

  return (
    <div className="flex h-full flex-col">
      <div className="px-16 pt-4 pb-4 sm:px-[max(64px,calc(50%-350px))]">
        <div className="flex items-center gap-3 flex-1">
          <IconPicker
            value={currentNote.icon || 'FileText'}
            iconColor={currentNote.iconColor || 'gray'}
            onChange={handleIconChange}
            onColorChange={handleIconColorChange}
          />
          <input
            className="w-full border-none bg-transparent font-bold text-4xl outline-none placeholder:text-muted-foreground/60 focus:placeholder:text-muted-foreground/40"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
            placeholder="Enter title..."
            ref={titleRef}
            type="text"
            value={title}
          />
        </div>
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
