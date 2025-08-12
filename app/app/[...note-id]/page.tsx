import { NoteEditor } from '@/components/notes/note-editor';

interface NotePageProps {
  params: Promise<{ 'note-id': string[] }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { 'note-id': noteIdArray } = await params;
  const noteId = noteIdArray?.[0];

  if (!noteId) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Invalid note ID</h1>
      </div>
    );
  }

  return <NoteEditor noteId={noteId} />;
}