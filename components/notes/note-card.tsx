import Link from 'next/link';
import { FileText, Star, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '../ui/button';
import { Note } from '@/lib/stores/notes-store';
import { getIconColorClasses } from '@/lib/utils';
import { cn } from '@/lib/utils';

type NoteCardProps = {
    note: Note;
    handleStarNote: (noteId: string, e: React.MouseEvent) => void;
    handleDeleteNote: (noteId: string, e: React.MouseEvent) => void;
}

const NoteCard = ({ note, handleStarNote, handleDeleteNote }: NoteCardProps) => {
    return (
        <Link 
            href={`/app/${note.id}`}
            className="group block"
        >
            <div className="bg-white border border-gray-200 rounded-md p-3 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        {(() => {
                            const IconComp = (LucideIcons as Record<string, any>)[note.icon] || FileText;
                            return <IconComp className={cn("h-4 w-4 flex-shrink-0", getIconColorClasses(note.iconColor))} />;
                        })()}
                        <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-gray-900 truncate text-sm">
                                {note.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {new Date(note.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleStarNote(note.id, e)}
                            className={`h-7 w-7 p-0 ${note.isStarred ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                        >
                            <Star className={`h-3.5 w-3.5 ${note.isStarred ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleDeleteNote(note.id, e)}
                            className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard