import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PublishSettings {
  editable: boolean;
  showLastUpdated: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isStarred: boolean;
  icon: string;
  iconColor: string;
  isPublished?: boolean;
  publishedUrl?: string;
  publishSettings?: PublishSettings;
}

interface NotesStore {
  notes: Note[];
  addNote: (title: string) => Note;
  updateNote: (id: string, updates: Partial<Omit<Note, 'createdAt' | 'updatedAt'>>) => void;
  deleteNote: (id: string) => void;
  starNote: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
  publishNote: (id: string, settings: PublishSettings) => Promise<string>;
  unpublishNote: (id: string) => void;
  migrateNotes: () => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (title: string) => {
        const newNote: Note = {
          id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: title || 'Untitled Note',
          content: 'Start writing your note here...',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isStarred: false,
          icon: 'FileText',
          iconColor: 'gray',
        };
        
        set((state) => ({
          notes: [newNote, ...state.notes]
        }));
        
        return newNote;
      },
      
      updateNote: (id: string, updates: Partial<Omit<Note, 'createdAt' | 'updatedAt'>>) => {
        set((state) => ({
          notes: state.notes.map(note => 
            note.id === id 
              ? { ...note, ...updates, updatedAt: new Date().toISOString() }
              : note
          )
        }));
      },

      // Migration function to add iconColor to existing notes
      migrateNotes: () => {
        set((state) => ({
          notes: state.notes.map(note => 
            note.iconColor ? note : { ...note, iconColor: 'gray' }
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
              ? { ...note, isStarred: !note.isStarred, updatedAt: new Date().toISOString() }
              : note
          )
        }));
      },
      
      getNoteById: (id: string) => {
        return get().notes.find(note => note.id === id);
      },

      publishNote: async (id: string, settings: PublishSettings) => {
        const note = get().notes.find(n => n.id === id);
        if (!note) throw new Error('Note not found');

        try {
          const response = await fetch('/api/publish', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              noteId: id,
              publishSettings: settings,
              noteContent: {
                title: note.title,
                content: note.content,
                icon: note.icon,
                iconColor: note.iconColor,
                updatedAt: note.updatedAt,
              }
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to publish note');
          }

          const result = await response.json();
          const publishedUrl = result.publishedUrl;

          // Update the note with publish info
          set((state) => ({
            notes: state.notes.map(note => 
              note.id === id 
                ? { 
                    ...note, 
                    isPublished: true,
                    publishedUrl,
                    publishSettings: settings,
                    updatedAt: new Date().toISOString() 
                  }
                : note
            )
          }));

          return publishedUrl;
        } catch (error) {
          console.error('Publishing failed:', error);
          throw error;
        }
      },

      unpublishNote: async (id: string) => {
        try {
          const response = await fetch('/api/publish', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ noteId: id }),
          });

          if (!response.ok) {
            throw new Error('Failed to unpublish note');
          }

          // Update the note state
          set((state) => ({
            notes: state.notes.map(note => 
              note.id === id 
                ? { 
                    ...note, 
                    isPublished: false,
                    publishedUrl: undefined,
                    publishSettings: undefined,
                    updatedAt: new Date().toISOString() 
                  }
                : note
            )
          }));
        } catch (error) {
          console.error('Unpublishing failed:', error);
          throw error;
        }
      },
    }),
    {
      name: 'notes-storage',
    }
  )
);
