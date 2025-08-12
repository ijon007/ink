import { create } from 'zustand';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isStarred: boolean;
  icon: string; // Lucide icon name
}

interface NotesStore {
  notes: Note[];
  addNote: (title: string) => Note;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  starNote: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  
  addNote: (title: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: title || 'Untitled Note',
      content: 'Start writing your note here...',
      createdAt: new Date(),
      updatedAt: new Date(),
      isStarred: false,
      icon: 'FileText',
    };
    
    set((state) => ({
      notes: [newNote, ...state.notes]
    }));
    
    return newNote;
  },
  
  updateNote: (id: string, updates: Partial<Note>) => {
    set((state) => ({
      notes: state.notes.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    }));
  },
  
  deleteNote: (id: string) => {
    set((state) => ({
      notes: state.notes.filter(note => note.id !== id)
    }));
  },
  
  starNote: (id: string) => {
    set((state) => ({
      notes: state.notes.map(note => 
        note.id === id 
          ? { ...note, isStarred: !note.isStarred }
          : note
      )
    }));
  },
  
  getNoteById: (id: string) => {
    return get().notes.find(note => note.id === id);
  },
}));
