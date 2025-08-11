'use client';

import * as React from 'react';

import { Plate, usePlateEditor } from 'platejs/react';
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
        <div className="flex flex-col h-full">
            <input
                ref={titleRef}
                type="text"
                placeholder="Enter title..."
                className="w-full px-16 pt-4 pb-4 text-2xl font-semibold border-none outline-none bg-transparent placeholder:text-muted-foreground/60 focus:placeholder:text-muted-foreground/40 sm:px-[max(64px,calc(50%-350px))]"
                onKeyDown={handleTitleKeyDown}
            />
            <Plate editor={editor}>
                <EditorContainer>
                    <Editor 
                        ref={editorRef}
                        variant="default" 
                    />
                </EditorContainer>
            </Plate>
        </div>
    );
}